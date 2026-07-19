import React from 'react';
import { Shield } from 'lucide-react';
import { COL } from '../components/theme.jsx';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 14.5, color: COL.ink, margin: '0 0 8px', fontWeight: 700 }}>{title}</h2>
      <div style={{ fontSize: 13, lineHeight: 1.75, color: COL.inkSoft }}>{children}</div>
    </div>
  );
}

export default function Privacy() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 40px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: COL.forest, letterSpacing: 1.5, marginBottom: 8 }}>
          <Shield size={12} /> 개인정보처리방침
        </div>
        <h1 style={{ fontSize: 24, color: COL.ink, margin: '0 0 6px', fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>개인정보처리방침</h1>
        <p style={{ fontSize: 11.5, color: COL.inkSoft, opacity: 0.7, margin: '0 0 20px' }}>최종 수정일: 2026년 7월</p>

        <div style={{ background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10, padding: '20px 18px', boxSizing: 'border-box' }}>
          <Section title="1. 수집하는 개인정보 항목">
            배당 통장은 이메일 주소와 비밀번호로 회원가입 및 로그인이 가능해요. 가입 시 입력하신 이메일 주소와, 서비스 이용을 위해 입력하시는 종목명, 보유수량, 매입단가 등 포트폴리오 정보는 Google Firebase(구글의 클라우드 서비스)를 통해 안전하게 저장돼요. 비밀번호는 암호화되어 저장되며 운영자를 포함한 누구도 원문을 열람할 수 없어요.
          </Section>
          <Section title="2. 광고 서비스 및 쿠키 사용">
            본 사이트는 Google AdSense를 통해 광고를 게재할 수 있어요. Google을 비롯한 제3자 광고 제공업체는 쿠키를 사용해 이용자의 관심사에 기반한 광고를 게재할 수 있으며, 이용자는{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{ color: COL.forest }}>
              Google 광고 설정 페이지
            </a>
            에서 맞춤 광고를 해제할 수 있어요.
          </Section>
          <Section title="3. 방문 통계 (분석 도구)">
            서비스 개선을 위해 Google Analytics 등 방문자 통계 분석 도구를 사용할 수 있어요. 이 도구는 IP 주소 등 비식별 정보를 활용해 방문 통계를 수집하며, 개인을 특정하지 않아요.
          </Section>
          <Section title="4. 데이터 보관 및 삭제">
            가입 시 등록하신 정보와 포트폴리오 데이터는 회원 탈퇴 또는 삭제를 요청하시기 전까지 Firebase 데이터베이스에 보관돼요. 계정 삭제를 원하시면 운영자에게 문의해주시면 처리해드려요.
          </Section>
          <Section title="5. 문의처">
            개인정보처리방침에 대해 궁금한 점이 있으시면 사이트 운영자에게 문의해주세요.
          </Section>
        </div>
      </div>
    </div>
  );
}
