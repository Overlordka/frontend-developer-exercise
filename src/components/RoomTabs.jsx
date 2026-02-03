
export default function RoomTabs() {
  const rooms = ['Soveværelse', 'Stue', 'Badeværelse'];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '18px' }}>Rum</h2>
        <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontSize: '14px' }}>
          Vis alle ↓
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        {rooms.map((room) => (
          <button
            key={room}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: room === 'Stue' ? 'var(--primary)' : 'white',
              color: room === 'Stue' ? 'white' : 'var(--text)',
              whiteSpace: 'nowrap',
              fontSize: '14px',
            }}
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
}