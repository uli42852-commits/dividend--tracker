import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Pencil, Wallet, TrendingUp, Percent, Calendar, X } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import { COL, AdSlot } from '../components/theme.jsx';

const MONTH_LABELS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

function formatWon(n) {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}

function emptyForm() {
  return { name: '', ticker: '', shares: '', avgPrice: '', annualDivPerShare: '', months: [] };
}

function SummaryCard({ icon: Icon, label, value, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10, padding: '14px 16px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Icon size={13} color={accent || COL.brass} />
        <span style={{ fontSize: 11, color: COL.inkSoft, letterSpacing: 0.3 }}>{label}</span>
      </div>
      <div style={{ fontSize: 19, fontWeight: 700, color: COL.ink, fontFamily: "'IBM Plex Mono', monospace", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </div>
    </div>
  );
}

function MonthlyLedgerChart({ data }) {
  const max = Math.max(1, ...data);
  return (
    <div style={{ background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10, padding: '18px 16px 12px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <Calendar size={13} color={COL.brass} />
        <span style={{ fontSize: 12, color: COL.inkSoft, letterSpacing: 0.3 }}>월별 예상 배당금</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 110 }}>
        {data.map((v, i) => {
          const h = v > 0 ? Math.max(6, (v / max) * 100) : 3;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div title={formatWon(v)} style={{ width: '100%', maxWidth: 22, height: `${h}px`, borderRadius: '3px 3px 1px 1px', background: v > 0 ? `linear-gradient(180deg, ${COL.brassLight}, ${COL.brass})` : COL.line }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        {MONTH_LABELS.map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9.5, color: COL.inkSoft }}>{i + 1}</div>
        ))}
      </div>
    </div>
  );
}

export default function Calculator() {
  const { currentUser } = useAuth();
  const [holdings, setHoldings] = useState([]);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const idRef = useRef(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'users', currentUser.uid));
        if (snap.exists()) {
          const data = snap.data().holdings || [];
          setHoldings(data);
          idRef.current = data.reduce((m, h) => Math.max(m, h.id || 0), 0) + 1;
        }
      } catch (e) {
        // no saved portfolio yet, or read failed
      }
      setLoading(false);
    })();
  }, [currentUser]);

  const persist = async (next) => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), { holdings: next }, { merge: true });
    } catch (e) {
      // save failed
    }
  };

  const toggleMonth = (m) => {
    setForm((f) => {
      const has = f.months.includes(m);
      return { ...f, months: has ? f.months.filter((x) => x !== m) : [...f.months, m].sort((a, b) => a - b) };
    });
  };

  const startEdit = (h) => {
    setEditingId(h.id);
    setForm({
      name: h.name, ticker: h.ticker || '', shares: String(h.shares),
      avgPrice: String(h.avgPrice), annualDivPerShare: String(h.annualDivPerShare), months: h.months,
    });
    setError('');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const shares = parseFloat(form.shares);
    const avgPrice = parseFloat(form.avgPrice);
    const divPerShare = parseFloat(form.annualDivPerShare);
    if (!form.name.trim()) { setError('종목명을 입력해주세요'); return; }
    if (!shares || shares <= 0) { setError('보유수량을 입력해주세요'); return; }
    if (!avgPrice || avgPrice <= 0) { setError('매입단가를 입력해주세요'); return; }
    if (isNaN(divPerShare) || divPerShare < 0) { setError('주당 연배당금을 입력해주세요'); return; }
    if (form.months.length === 0) { setError('배당 지급월을 최소 1개 선택해주세요'); return; }

    let next;
    if (editingId !== null) {
      next = holdings.map((h) => h.id === editingId
        ? { ...h, name: form.name.trim(), ticker: form.ticker.trim(), shares, avgPrice, annualDivPerShare: divPerShare, months: form.months }
        : h);
    } else {
      const holding = { id: idRef.current++, name: form.name.trim(), ticker: form.ticker.trim(), shares, avgPrice, annualDivPerShare: divPerShare, months: form.months };
      next = [...holdings, holding];
    }
    setHoldings(next);
    persist(next);
    setForm(emptyForm());
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const next = holdings.filter((h) => h.id !== id);
    setHoldings(next);
    persist(next);
    if (editingId === id) cancelEdit();
  };

  const totalPrincipal = holdings.reduce((s, h) => s + h.shares * h.avgPrice, 0);
  const totalAnnualDiv = holdings.reduce((s, h) => s + h.shares * h.annualDivPerShare, 0);
  const avgYield = totalPrincipal > 0 ? (totalAnnualDiv / totalPrincipal) * 100 : 0;

  const monthlyData = MONTH_LABELS.map((_, i) => {
    const m = i + 1;
    return holdings.reduce((sum, h) => {
      if (!h.months.includes(m)) return sum;
      return sum + (h.shares * h.annualDivPerShare) / h.months.length;
    }, 0);
  });

  const inputStyle = { width: '100%', background: '#fffdf9', borderRadius: 6, padding: '9px 10px', fontSize: 13.5, color: COL.ink, border: `1px solid ${COL.lineStrong}`, boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" };
  const labelStyle = { display: 'block', fontSize: 11, color: COL.inkSoft, marginBottom: 5, letterSpacing: 0.2 };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 20px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 16 }}>
        <AdSlot label="광고 영역 · AdSense 승인 후 여기에 스크립트 삽입" />
      </div>

      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: COL.forest, letterSpacing: 1.5, marginBottom: 8 }}>
            <Wallet size={12} /> 배당 포트폴리오 계산기
          </div>
          <h1 style={{ fontSize: 28, color: COL.ink, margin: '0 0 4px', fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>배당 통장</h1>
          <p style={{ fontSize: 12.5, color: COL.inkSoft, margin: 0 }}>보유 종목을 등록하면 연간 배당금과 월별 지급 흐름을 계산해드려요</p>
        </div>

        {loading && (
          <p style={{ fontSize: 12.5, color: COL.inkSoft, textAlign: 'center', padding: '20px 0' }}>불러오는 중…</p>
        )}

        {!loading && holdings.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <SummaryCard icon={Wallet} label="총 투자원금" value={formatWon(totalPrincipal)} />
              <SummaryCard icon={TrendingUp} label="연간 예상 배당금" value={formatWon(totalAnnualDiv)} accent={COL.forest} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <SummaryCard icon={Percent} label="평균 배당수익률 (세전, 원금 대비)" value={avgYield.toFixed(2) + ' %'} accent={COL.rust} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <MonthlyLedgerChart data={monthlyData} />
            </div>
            <div style={{ background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10, padding: '4px 16px', marginBottom: 20, boxSizing: 'border-box' }}>
              {holdings.map((h, i) => (
                <div key={h.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0', borderBottom: i < holdings.length - 1 ? `1px solid ${COL.line}` : 'none', gap: 8,
                  background: editingId === h.id ? 'rgba(184,134,60,0.08)' : 'transparent',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: COL.ink, fontWeight: 600 }}>{h.name}{h.ticker ? ` · ${h.ticker}` : ''}</div>
                    <div style={{ fontSize: 11.5, color: COL.inkSoft, marginTop: 2, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {h.shares}주 · 평단 {formatWon(h.avgPrice)} · 연배당 {formatWon(h.shares * h.annualDivPerShare)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    <button onClick={() => startEdit(h)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: COL.forest, opacity: 0.75 }} aria-label="수정">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(h.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: COL.rust, opacity: 0.7 }} aria-label="삭제">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <form ref={formRef} onSubmit={handleSubmit} style={{ background: COL.cardBg, border: `1px solid ${editingId !== null ? COL.brass : COL.line}`, borderRadius: 10, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12.5, color: COL.ink, fontWeight: 600 }}>{editingId !== null ? '종목 수정' : '종목 추가'}</div>
            {editingId !== null && (
              <button type="button" onClick={cancelEdit} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: COL.inkSoft, display: 'flex', alignItems: 'center', gap: 3, fontSize: 11.5 }}>
                <X size={12} /> 취소
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>종목명</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="예: 삼성전자" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>티커 (선택)</label>
              <input value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} placeholder="005930" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>보유수량 (주)</label>
              <input type="number" min="0" value={form.shares} onChange={(e) => setForm({ ...form, shares: e.target.value })} placeholder="10" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>매입단가 (원)</label>
              <input type="number" min="0" value={form.avgPrice} onChange={(e) => setForm({ ...form, avgPrice: e.target.value })} placeholder="70000" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>주당 연배당금 (원)</label>
            <input type="number" min="0" value={form.annualDivPerShare} onChange={(e) => setForm({ ...form, annualDivPerShare: e.target.value })} placeholder="1500" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>배당 지급월 (해당 월 모두 선택)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {MONTH_LABELS.map((label, i) => {
                const m = i + 1;
                const active = form.months.includes(m);
                return (
                  <button type="button" key={m} onClick={() => toggleMonth(m)} style={{ padding: '6px 0', borderRadius: 5, fontSize: 11.5, cursor: 'pointer', border: `1px solid ${active ? COL.brass : COL.lineStrong}`, background: active ? COL.brass : 'transparent', color: active ? '#fffdf7' : COL.inkSoft }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          {error && <p style={{ fontSize: 12, color: COL.rust, margin: 0 }}>{error}</p>}
          <button type="submit" style={{ marginTop: 4, padding: '11px', borderRadius: 7, fontSize: 13.5, fontWeight: 600, color: '#fffdf7', background: COL.forest, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Plus size={14} /> {editingId !== null ? '수정 완료' : '종목 추가하기'}
          </button>
        </form>

        <p style={{ fontSize: 11, color: COL.inkSoft, opacity: 0.75, marginTop: 14, lineHeight: 1.6 }}>
          배당소득세(15.4%)는 반영되지 않은 세전 기준이며, 실제 배당금은 기업 정책에 따라 달라질 수 있어요.
          이 계산기는 참고용 도구이며 투자 자문이 아니에요.
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 480, marginTop: 20 }}>
        <AdSlot label="광고 영역 · AdSense 승인 후 여기에 스크립트 삽입" />
      </div>
    </div>
  );
}
