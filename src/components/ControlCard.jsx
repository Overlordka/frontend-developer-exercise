
export default function ControlCard({ title, items, hasSettingsButton = false }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px' }}>{title}</h3>
        {hasSettingsButton && (
          <button
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          >
            Indstillinger
          </button>
        )}
      </div>

      {items.map((item) => (
        <div
          key={item.name}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '15px' }}>{item.name}</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {item.temp && <span style={{ color: 'var(--text-light)', fontSize: '14px' }}>{item.temp}</span>}
            <label className="switch">
              <input type="checkbox" defaultChecked={item.on} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      ))}

      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #0066ff;
        }
        input:checked + .slider:before {
          transform: translateX(20px);
        }
      `}</style>
    </div>
  );
}