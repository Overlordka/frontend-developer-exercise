import { useEffect, useRef, useState } from 'react';
import { fetchDevices } from '../scripts/fetch.js';
import { updateDevice } from '../scripts/post.js';


export default function ConfigIndst() {
  const [deviceId, setDeviceId] = useState(null);
  const [temperature, setTemperature] = useState(0);
  const [indoorTemp, setIndoorTemp] = useState(0);
  const [ventilationLevel, setVentilationLevel] = useState(3);
  const [mode, setMode] = useState('manual');
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [powerFieldName, setPowerFieldName] = useState('');
  const [lastSavedPayload, setLastSavedPayload] = useState(null);
  const syncTimerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadDevices = async () => {
      try {
        const devices = await fetchDevices();
        const device = devices?.[0];

        if (!device || !isMounted) {
          return;
        }

        const resolvedDeviceId = device.id ?? device.device_id ?? null;
        const targetTemp = Math.round(Number(device.target_temp ?? 0));
        const currentTemp = Math.round(Number(device.current_temp ?? 0));
        const currentMode = typeof device.work_mode === 'string' ? device.work_mode : 'manual';
        const ventLevel = Math.round(Number(device.vent_level ?? 0));

        let detectedPowerField = '';
        let detectedPowerValue = true;

        if (typeof device.is_on === 'boolean') {
          detectedPowerField = 'is_on';
          detectedPowerValue = device.is_on;
        } else if (typeof device.power === 'boolean') {
          detectedPowerField = 'power';
          detectedPowerValue = device.power;
        } else if (typeof device.is_power_on === 'boolean') {
          detectedPowerField = 'is_power_on';
          detectedPowerValue = device.is_power_on;
        }

        const initialPayload = {
          target_temp: targetTemp,
          vent_level: ventLevel,
          work_mode: currentMode,
          ...(detectedPowerField ? { [detectedPowerField]: detectedPowerValue } : {}),
        };

        setDeviceId(resolvedDeviceId);
        setIndoorTemp(currentTemp);
        setTemperature(targetTemp);
        setMode(currentMode);
        setVentilationLevel(ventLevel);
        setIsPowerOn(detectedPowerValue);
        setPowerFieldName(detectedPowerField);
        setLastSavedPayload(initialPayload);
      } catch (error) {
        console.error('Failed to load devices:', error);
      }
    };

    loadDevices();

    return () => {
      isMounted = false;
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!deviceId || !lastSavedPayload) {
      return;
    }

    const nextPayload = {
      target_temp: temperature,
      vent_level: ventilationLevel,
      work_mode: mode,
      ...(powerFieldName ? { [powerFieldName]: isPowerOn } : {}),
    };

    if (JSON.stringify(nextPayload) === JSON.stringify(lastSavedPayload)) {
      return;
    }

    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = setTimeout(async () => {
      try {
        await updateDevice(deviceId, nextPayload);
        setLastSavedPayload(nextPayload);
      } catch (error) {
        console.error('Failed to update device:', error);
      }
    }, 350);

    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [deviceId, isPowerOn, lastSavedPayload, mode, powerFieldName, temperature, ventilationLevel]);

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const handleTempChange = (e) => {
    setTemperature(clamp(Number(e.target.value), 10, 30));
  };

  const handleVentilationChange = (e) => {
    setVentilationLevel(clamp(Number(e.target.value), 0, 5));
  };

  return (
    <div className="config-indst">
      {/* Thermostat Section */}
      <div className="config-indst__section">
        <h3 className="config-indst__title">Stue</h3>
        
        <div className="config-indst__thermostat">
          <div className="config-indst__thermostat-display">
            <span className="config-indst__thermostat-temp">{temperature}°C</span>
            <span className="config-indst__thermostat-label">Termostat</span>
          </div>

          <div className="config-indst__thermostat-controls">
            <button 
              className="config-indst__temp-btn"
              onClick={() => setTemperature(Math.max(10, temperature - 1))}
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
              onClick={() => setTemperature(Math.min(30, temperature + 1))}
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
            onClick={() => setMode('manual')}
          >
            <img src={`../public/icons/icon_manual_${mode === 'manual' ? 'on' : 'off'}.png`} alt="manual" />
            Manual
          </button>
          <button
            className={`config-indst__mode-btn ${mode === 'tidsplan' ? 'active' : ''}`}
            onClick={() => setMode('tidsplan')}
          >
            <img src={`../public/icons/icon_schedule_${mode === 'tidsplan' ? 'on' : 'off'}.png`} alt="tidsplan" />
            Tidsplan
          </button>
          <button
            className={`config-indst__mode-btn ${mode === 'boost' ? 'active' : ''}`}
            onClick={() => setMode('boost')}
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