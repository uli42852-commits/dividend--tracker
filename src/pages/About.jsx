import React from 'react';
import { Info } from 'lucide-react';
import { COL } from '../components/theme.jsx';

export default function About() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 40px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: COL.forest, letterSpacing: 1.5, marginBottom: 8 }}>
          <Info size={12} /> 소개
        </div>
        <h1 style={{ fontSize: 26, color: COL.ink, margin: '0 0 16px', fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>배당 통장 소개</h1>

        <div style={{ background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10, padding: '20px 18px', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: COL.inkSoft, margin: '0 0 14px' }}>
            배당 통장은 보유하고 있는 배당주를 등록하면 연간 예상 배당금과 월별 지급 흐름을 한눈에 볼 수 있게 도와주는 무료 계산 도구예요.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: COL.inkSoft, margin: '0 0 14px' }}>
            여러 증권사 계좌에 나뉘어 있는 배당주들을 한곳에 모아보고 싶은데, 복잡한 회원가입 없이 간단하게 확인하고 싶은 분들을 위해 만들었어요. 종목명, 보유수량, 매입단가, 주당 연배당금, 배당 지급월만 입력하면 총 투자원금, 연간 예상 배당금, 평균 배당수익률, 그리고 달마다 얼마씩 배당이 들어오는지를 자동으로 계산해드려요.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: COL.inkSoft, margin: '0 0 14px' }}>
            가입하신 계정 정보와 포트폴리오 데이터는 안전하게 클라우드에 저장되어, 로그인하시면 어느 기기에서든 확인하실 수 있어요.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: COL.inkSoft, margin: 0 }}>
            이 도구는 참고용 계산기이며, 투자 자문이나 세무 자문을 대체하지 않아요. 실제 배당금은 기업의 정책 변경에 따라 달라질 수 있으니 투자 결정 전에 꼭 공식 공시자료를 확인해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
