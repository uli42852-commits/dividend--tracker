import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { COL } from './theme.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const NAV_ITEMS = [
  { to: '/', label: '계산기' },
  { to: '/guide', label: '배당 가이드' },
  { to: '/about', label: '소개' },
];

export default function Layout() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: COL.paper, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        a { text-decoration: none; }
        input::placeholder { color: rgba(31,43,61,0.32); }
        input:focus { outline: none; border-color: ${COL.brass}; }
        button { font-family: inherit; }
      `}</style>

      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '14px 16px', borderBottom: `1px solid ${COL.line}`, boxSizing: 'border-box',
        position: 'sticky', top: 0, background: COL.paper, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 480, width: '100%' }}>
          <div style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} style={{
                  padding: '6px 12px', borderRadius: 6, fontSize: 12.5,
                  color: active ? '#fffdf7' : COL.inkSoft,
                  background: active ? COL.forest : 'transparent',
                  fontWeight: active ? 600 : 500,
                }}>
                  {item.label}
                </Link>
              );
            })}
          </div>
          {currentUser ? (
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 4, background: 'transparent',
              border: 'none', cursor: 'pointer', color: COL.inkSoft, fontSize: 11.5, padding: '6px 4px', flexShrink: 0,
            }}>
              <LogOut size={13} /> 로그아웃
            </button>
          ) : (
            <Link to="/login" style={{
              fontSize: 12, color: COL.forest, fontWeight: 600, padding: '6px 4px', flexShrink: 0,
            }}>
              로그인
            </Link>
          )}
        </div>
      </header>

      <Outlet />

      <footer style={{
        borderTop: `1px solid ${COL.line}`, padding: '20px 16px 32px', textAlign: 'center', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 8 }}>
          <Link to="/privacy" style={{ fontSize: 11.5, color: COL.inkSoft }}>개인정보처리방침</Link>
          <Link to="/about" style={{ fontSize: 11.5, color: COL.inkSoft }}>소개</Link>
        </div>
        <p style={{ fontSize: 11, color: COL.inkSoft, opacity: 0.6, margin: 0 }}>배당 통장 · 참고용 계산 도구</p>
      </footer>
    </div>
  );
}

