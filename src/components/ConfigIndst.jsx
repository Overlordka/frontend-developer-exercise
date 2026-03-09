import { useEffect, useState } from 'react';
import { fetchDevices } from '../scripts/fetch.js';
import { updateDevice } from '../scripts/put.js';


export default function ConfigIndst() {
  const [deviceId, setDeviceId] = useState(null);
  const [name, setName] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [indoorTemp, setIndoorTemp] = useState(0);
  const [ventilationLevel, setVentilationLevel] = useState(0);
  const [mode, setMode] = useState('off');
  const [isPowerOn, setIsPowerOn] = useState(true);

  const mapApiModeToUi = (apiMode) => {
    if (apiMode === 'schedule' || apiMode === 'scheduled') {
      return 'tidsplan';
    }

    return apiMode;
  };

  const mapUiModeToApi = (uiMode) => {
    if (uiMode === 'tidsplan') {
      return 'schedule';
    }

    return uiMode;
  };

  useEffect(() => {
    const loadDevices = async () => {
      const devices = await fetchDevices();
      const device = devices[0];

      const name = device.name;
      const targetTemp = Math.round(device.target_temp);
      const currentTemp = Math.round(device.current_temp);
      const currentMode = device.work_mode;
      const ventLevel = device.vent_level;

      setDeviceId(device.id);

      setName(name);
      setIndoorTemp(currentTemp);
      setTemperature(targetTemp);
      setMode(mapApiModeToUi(currentMode));
      setVentilationLevel(ventLevel);
    };

    loadDevices();
  }, []);

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const handleTempChange = (e) => {
    const nextTemp = clamp(Number(e.target.value), 10, 30);
    updateThermostat(nextTemp);
  };

  const handleVentilationChange = (e) => {
    const nextLevel = clamp(Number(e.target.value), 0, 5);
    updateVentilation(nextLevel);
  };

  const updateThermostat = async (nextTemp) => {
    if (deviceId) {
      try {
        await updateDevice(deviceId, {
          target_temp: nextTemp,
        });
      } catch (error) {
        console.error('Failed to update thermostat:', error);
      }
    }

    setTemperature(nextTemp);
  };

  const updateVentilation = async (nextLevel) => {
    if (deviceId) {
      try {
        await updateDevice(deviceId, {
          vent_level: nextLevel,
        });
      } catch (error) {
        console.error('Failed to update ventilator:', error);
      }
    }

    setVentilationLevel(nextLevel);
  };

  const updateMode = async (nextMode) => {
    const apiMode = mapUiModeToApi(nextMode);

    if (deviceId) {
      try {
        await updateDevice(deviceId, {
          work_mode: nextMode,
        });
      } catch (error) {
        console.error('Failed to update mode:', error);
      }
    }

    setMode(nextMode);
  };

  return (
    <div className="config-indst">
      {/* Thermostat Section */}
      <div className="config-indst__section">
        <h3 className="config-indst__title">{name}</h3>
        
        <div className="config-indst__thermostat">
          <div className="config-indst__thermostat-display">
            <span className="config-indst__thermostat-temp">{temperature}°C</span>
            <span className="config-indst__thermostat-label">Termostat</span>
          </div>

          <div className="config-indst__thermostat-controls">
            <button 
              className="config-indst__temp-btn"
              onClick={() => updateThermostat(clamp(temperature - 1, 10, 30))}
            >
              −
            </button>
            <input
              type="range"
              min="10"
              max="30"
              value={temperature}
              onChange={handleTempChange}
              className="config-indst__thermostat-slider"
            />
            <button 
              className="config-indst__temp-btn"
              onClick={() => updateThermostat(clamp(temperature + 1, 10, 30))}
            >
              +
            </button>
          </div>
        </div>

        {/* Temperature readings */}
        <div className="config-indst__temp-readings">
          <div className="config-indst__temp-item">
            <img src="../public/icons/icon_cloud.png" alt="outdoor" className="config-indst__temp-icon" />
            <span className="config-indst__temp-value">11°C</span>
            <span className="config-indst__temp-label">Udetemperatur</span>
          </div>
          <div className="config-indst__temp-item">
            <img src="../public/icons/icon_temp.png" alt="indoor" className="config-indst__temp-icon" />
            <span className="config-indst__temp-value">{indoorTemp}°C</span>
            <span className="config-indst__temp-label">Indetemperatur</span>
          </div>
        </div>
      </div>

      {/* Ventilator Section */}
      <div className="config-indst__section">
        <h3 className="config-indst__title">Ventilator</h3>
        
        <div className="config-indst__ventilator">
          <img src="../public/icons/icon_fan-coil.png" alt="ventilator" className="config-indst__ventilator-icon" />
          
          <div className="config-indst__ventilator-bars">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`config-indst__ventilator-bar ${level <= ventilationLevel ? 'active' : ''}`}
              />
            ))}
          </div>

          <input
            type="range"
            min="0"
            max="5"
            value={ventilationLevel}
            onChange={handleVentilationChange}
            className="config-indst__ventilator-input"
          />
        </div>
      </div>

      {/* Mode Section */}
      <div className="config-indst__section">
        <h3 className="config-indst__title">Mode</h3>
        
        <div className="config-indst__modes">
          <button
            className={`config-indst__mode-btn ${mode === 'manual' ? 'active' : ''}`}
            onClick={() => updateMode('manual')}
          >
            <img src={`../public/icons/icon_manual_${mode === 'manual' ? 'on' : 'off'}.png`} alt="manual" />
            Manual
          </button>
          <button
            className={`config-indst__mode-btn ${mode === 'timed' ? 'active' : ''}`}
            onClick={() => updateMode('timed')}
          >
            <img src={`../public/icons/icon_schedule_${mode === 'timed' ? 'on' : 'off'}.png`} alt="timed" />
            Tidsplan
          </button>
          <button
            className={`config-indst__mode-btn ${mode === 'boost' ? 'active' : ''}`}
            onClick={() => updateMode('boost')}
          >
            <img src={`../public/icons/icon_boost_${mode === 'boost' ? 'on' : 'off'}.png`} alt="boost" />
            Boost
          </button>
        </div>
      </div>

      {/* Power Button */}
      <button className={`config-indst__power-btn ${isPowerOn ? 'on' : 'off'}`} onClick={() => setIsPowerOn(!isPowerOn)}>

        <img src={`../public/icons/icon_${isPowerOn ? 'on' : 'off'}.png`} alt="power" />
      </button>
    </div>
  );
}