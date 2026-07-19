import React from 'react';
import { BookOpen } from 'lucide-react';
import { COL, AdSlot } from '../components/theme.jsx';

const ARTICLES = [
  {
    title: '배당수익률이란?',
    body: `배당수익률은 주식 1주를 보유했을 때 받는 연간 배당금이 매입가(또는 현재가) 대비 몇 퍼센트인지를 나타내는 지표예요.

예를 들어 10만원에 산 주식이 1년에 3,000원의 배당금을 준다면, 배당수익률은 3%가 돼요. 이 계산기에서 보여주는 수익률은 "매입단가 기준"이라 실제 시가 기준 수익률과는 다를 수 있어요.

배당수익률이 지나치게 높은 종목은 주가가 급락해서 상대적으로 수익률이 부풀려진 경우도 있으니, 숫자만 보고 판단하기보다는 회사의 실적과 배당 정책을 함께 살펴보는 게 좋아요.`,
  },
  {
    title: '배당소득세, 얼마나 떼일까?',
    body: `한국에서 배당소득은 원천징수 대상이에요. 일반적으로 배당금의 15.4%(소득세 14% + 지방소득세 1.4%)가 자동으로 원천징수된 뒤 나머지 금액이 계좌에 입금돼요.

이 계산기에 입력하는 "주당 연배당금"은 세전 기준으로 계산하시는 걸 권장해요. 실제 수령액을 알고 싶다면 계산된 연간 배당금에서 15.4%를 뺀 금액을 참고하시면 대략적인 실수령액을 가늠할 수 있어요.

금융소득(이자+배당)이 연 2,000만원을 넘으면 금융소득종합과세 대상이 될 수 있어 세율이 달라질 수 있으니, 배당 규모가 커지면 세무 전문가와 상담하는 걸 권해드려요.`,
  },
  {
    title: '배당 지급월은 어떻게 확인하나요?',
    body: `국내 상장사 대부분은 연 1회(보통 결산월 다음 분기) 배당을 지급하고, 일부 대기업이나 금융지주사는 분기배당(연 4회) 또는 반기배당(연 2회)을 실시해요.

정확한 배당 지급월은 각 기업의 IR 페이지나 전자공시시스템(DART)에서 "배당에 관한 사항" 공시를 확인하면 알 수 있어요. 배당 정책은 회사 상황에 따라 매년 바뀔 수 있어서, 이 계산기에 입력한 지급월도 주기적으로 업데이트해주시는 게 좋아요.

미국 주식은 대부분 분기배당(연 4회)이 기본이라, 배당 지급월을 4개 정도로 나누어 입력하시면 좀 더 현실적인 월별 흐름을 볼 수 있어요.`,
  },
  {
    title: '배당주 포트폴리오, 이렇게 접근해보세요',
    body: `배당 투자를 처음 시작한다면 한 종목에 집중하기보다 여러 업종에 걸쳐 분산하는 게 안전해요. 특정 업종이 불황일 때 배당을 삭감하는 경우가 있기 때문이에요.

또한 배당 지급월이 서로 다른 종목들을 섞어서 담으면, 이 계산기의 "월별 배당 캘린더"처럼 매달 고르게 현금 흐름이 들어오는 포트폴리오를 만들 수 있어요.

배당 성장(꾸준히 배당을 늘려온 기업)에 주목하는 것도 장기적으로 도움이 돼요. 단순히 수익률이 높은 종목보다, 몇 년간 배당을 유지하거나 늘려온 이력이 있는 기업이 안정성 면에서 유리한 경우가 많아요.`,
  },
];

export default function Guide() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 20px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 16 }}>
        <AdSlot label="광고 영역 · AdSense 승인 후 여기에 스크립트 삽입" />
      </div>

      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: COL.forest, letterSpacing: 1.5, marginBottom: 8 }}>
            <BookOpen size={12} /> 배당 투자 가이드
          </div>
          <h1 style={{ fontSize: 26, color: COL.ink, margin: '0 0 4px', fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>알아두면 좋은 배당 지식</h1>
          <p style={{ fontSize: 12.5, color: COL.inkSoft, margin: 0 }}>배당 투자를 시작하기 전 알아두면 유용한 기본 개념들이에요</p>
        </div>

        {ARTICLES.map((a, i) => (
          <div key={i} style={{
            background: COL.cardBg, border: `1px solid ${COL.line}`, borderRadius: 10,
            padding: '18px 18px', marginBottom: 14, boxSizing: 'border-box',
          }}>
            <h2 style={{ fontSize: 15.5, color: COL.ink, margin: '0 0 10px', fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>{a.title}</h2>
            {a.body.split('\n\n').map((p, j) => (
              <p key={j} style={{ fontSize: 13, lineHeight: 1.75, color: COL.inkSoft, margin: '0 0 10px' }}>{p}</p>
            ))}
          </div>
        ))}

        <p style={{ fontSize: 11, color: COL.inkSoft, opacity: 0.7, marginTop: 6, lineHeight: 1.6 }}>
          이 페이지의 내용은 일반적인 정보 제공을 목적으로 하며, 특정 종목에 대한 투자 권유가 아니에요. 투자 결정은 본인의 판단과 책임 하에 이루어져야 해요.
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 480, marginTop: 20 }}>
        <AdSlot label="광고 영역 · AdSense 승인 후 여기에 스크립트 삽입" />
      </div>
    </div>
  );
}
