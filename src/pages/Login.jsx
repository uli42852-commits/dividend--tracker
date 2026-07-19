import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { COL } from '../components/theme.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function mapError(code) {
  switch (code) {
    case 'auth/invalid-email': return '이메일 형식이 올바르지 않아요';
    case 'auth/user-not-found': return '가입되지 않은 이메일이에요';
    case 'auth/wrong-password': return '비밀번호가 일치하지 않아요';
    case 'auth/invalid-credential': return '이메일 또는 비밀번호가 일치하지 않아요';
    case 'auth/email-already-in-use': return '이미 가입된 이메일이에요';
    case 'auth/weak-password': return '비밀번호는 6자 이상이어야 해요';
    default: return '오류가 발생했어요. 다시 시도해주세요';
  }
}

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) { setError('이메일과 비밀번호를 입력해주세요'); return; }
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await signup(email.trim(), password);
      }
      navigate('/');
    } catch (err) {
      setError(mapError(err.code));
    }
    setBusy(false);
  };

  const inputStyle = { width: '100%', background: '#fffdf9', borderRadius: 6, padding: '10px 12px', fontSize: 14, color: COL.ink, border: `1px solid ${COL.lineStrong}`, boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" };
  const labelStyle = { display: 'block', fontSize: 11, color: COL.inkSoft, marginBottom: 5, letterSpacing: 0.2 };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 16px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, color: COL.ink, margin: '0 0 6px', fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>
            {mode === 'login' ? '로그인' : '회원가입'}
          </h1>
          <p style={{ fontSize: 12.5, color: COL.inkSoft, margin: 0 }}>
            {mode === 'login' ? '내 배당 포트폴리오를 확인해보세요' : '가입하고 어느 기기에서든 포트폴리오를 확인하세요'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10, padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6자 이상" style={inputStyle} />
          </div>
          {error && <p style={{ fontSize: 12, color: COL.rust, margin: 0 }}>{error}</p>}
          <button type="submit" disabled={busy} style={{
            padding: '11px', borderRadius: 7, fontSize: 13.5, fontWeight: 600, color: '#fffdf7',
            background: COL.forest, border: 'none', cursor: 'pointer', opacity: busy ? 0.6 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            {mode === 'login' ? <LogIn size={14} /> : <UserPlus size={14} />}
            {busy ? '처리 중…' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12.5, color: COL.inkSoft, marginTop: 16 }}>
          {mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            style={{ background: 'none', border: 'none', color: COL.forest, fontWeight: 600, cursor: 'pointer', fontSize: 12.5, padding: 0 }}
          >
            {mode === 'login' ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  );
}
