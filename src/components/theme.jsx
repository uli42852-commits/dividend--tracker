export const COL = {
  paper: '#f6f1e4',
  ink: '#1f2b3d',
  inkSoft: '#4a5568',
  forest: '#2f5c4a',
  brass: '#b8863c',
  brassLight: '#d9ad63',
  rust: '#b4553f',
  line: 'rgba(31,43,61,0.12)',
  lineStrong: 'rgba(31,43,61,0.22)',
  cardBg: '#fffdf7',
};

export function AdSlot({ label }) {
  return (
    <div style={{
      width: '100%', border: `1px dashed ${COL.lineStrong}`, borderRadius: 6,
      padding: '10px 16px', textAlign: 'center', fontSize: 11, letterSpacing: 0.5,
      color: COL.inkSoft, opacity: 0.55, boxSizing: 'border-box',
    }}>
      {label}
    </div>
  );
}
