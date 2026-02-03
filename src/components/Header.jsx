export default function Header() {
  return (
    <header style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button style={{ fontSize: '24px', background: 'none', border: 'none' }}>☰</button>
      <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Smart Home</h1>
    </header>
  );
}