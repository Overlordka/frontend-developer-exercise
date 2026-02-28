
import ControlCard from './ControlCard';

export default function SmartSection() {
  return (
    <div className='smart-settings'>
      <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Smart indstillinger</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <ControlCard
          title="Lys i Stuen"
          items={[
            { name: 'Alt lys', on: true },
            { name: 'Loftlampe', on: true },
            { name: 'Bordlampe 1', on: true },
            { name: 'Bordlampe 2', on: true },
          ]}
        />

        <ControlCard
          title="Varme i Stuen"
          items={[
            { name: 'Fan Coil', on: true, temp: '22°C', mode: 'Manuel - mode' },
          ]}
          hasSettingsButton
        />

        <ControlCard
          title="Lys i Køkken"
          items={[
            { name: 'Køkkenbord', on: true },
            { name: 'Loftlampe', on: true },
          ]}
        />

        <ControlCard
          title="Varme i Soveværelse"
          items={[
            { name: 'Radiator', on: false, temp: '17°C' },
          ]}
        />
      </div>
    </div>
  );
}