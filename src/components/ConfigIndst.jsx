import { useState } from 'react';

export default function ConfigIndst() {
  const [temperature, setTemperature] = useState(23);
  const [ventilationLevel, setVentilationLevel] = useState(3);
  const [mode, setMode] = useState('manuel');
  const [isPowerOn, setIsPowerOn] = useState(true);

  const handleTempChange = (e) => {
    setTemperature(parseInt(e.target.value));
  };

  const handleVentilationChange = (e) => {
    setVentilationLevel(parseInt(e.target.value));
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
            <span className="config-indst__temp-value">22°C</span>
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
            className={`config-indst__mode-btn ${mode === 'manuel' ? 'active' : ''}`}
            onClick={() => setMode('manuel')}
          >
            <img src={`../public/icons/icon_manual_${mode === 'manuel' ? 'on' : 'off'}.png`} alt="manuel" />
            Manuel
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