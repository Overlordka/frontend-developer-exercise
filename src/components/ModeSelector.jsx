
export default function ModeSelector() {
  const modes = [
    { icon: '🏠', label: 'Hjem', active: true },
    { icon: '🏠', label: 'Ude' }, 
    { icon: '😴', label: 'Sover' },
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
      {modes.map((mode) => (
        <button
          key={mode.label}
          style={{
            flex: 1,
            padding: '12px',
            border: `1px solid ${mode.active ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '12px',
            background: mode.active ? 'rgba(0,102,255,0.08)' : 'white',
            fontWeight: mode.active ? 600 : 400,
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>{mode.icon}</div>
          <div>{mode.label}</div>
        </button>
      ))}
    </div>
  );
}