
export default function EnergyCard() {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
        Energi Forbrug
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '28px', fontWeight: 700 }}>29,3 kWh</div>
          <div style={{ fontSize: '13px', color: 'var(--green)' }}>23% mindre end i går</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-light)' }}>21 jan 2026</div>
          <div style={{
            background: '#eff6ff',
            color: 'var(--primary)',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 500,
            marginTop: '4px'
          }}>
            22°C
          </div>
        </div>
      </div>
    </div>
  );
}