
export default function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <button style={{ background: 'none', border: 'none', fontSize: '24px' }}>🏠</button>
      <button style={{ background: 'none', border: 'none', fontSize: '24px' }}>≈</button>
      <button style={{ background: 'none', border: 'none', fontSize: '24px' }}>💡</button>
    </nav>
  );
}