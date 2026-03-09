
import { useEffect, useState } from 'react';
import ControlCard from './ControlCard';
import { fetchDevices } from '../scripts/fetch.js';

export default function SmartSection() {
  const [livingRoomTemp, setLivingRoomTemp] = useState('...');

  useEffect(() => {
    const loadDevices = async () => {
      const devices = await fetchDevices();
      const currentTemp = Math.round(devices[0].current_temp) + "°C";
      setLivingRoomTemp(currentTemp);
    };

    loadDevices();

  }, []);

  return (
    <section className='smart-settings'>
      <h2 className='smart-settings__title'>Smart indstillinger</h2>

      <section className='smart-settings__container'>

        <div className='smart-settings__grid'>
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
              { name: 'Fan Coil', on: true },
            ]}
            temp={livingRoomTemp}
          />

          <ControlCard
            title="Lys i Køkken"
            items={[
              { name: 'Køkkenbord', on: true },
              { name: 'Loftlampe', on: true },
            ]}
            title2="Varme i Køkken"
            items2={[
              { name: 'Fan Coil', on: true },
            ]}
          />

          <ControlCard
            title="Varme i Soveværelse"
            items={[
              { name: 'Radiator', on: false },
            ]}
            temp="17°C"
          />

          <ControlCard
            title="Lys i Indkørsel"
            items={[
              { name: 'Væglamper', on: true },
              { name: 'Bedlamper', on: true },
            ]}
            title2="Lys i Garage"
            items2={[
              { name: 'Alt lys', on: true },
            ]}
          />

          <ControlCard
            title="Varme i Bedeværelse"
            items={[
              { name: 'Gulvvarme', on: false },
            ]}
            temp="21°C"
          />
        </div>
      </section>
    </section>
  );
}