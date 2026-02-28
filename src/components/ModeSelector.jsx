import { useState } from 'react';

export default function ModeSelector() {
  const [activeMode, setActiveMode] = useState(null);

  const handleModeClick = (mode) => {
    setActiveMode(mode);
  };

  return (
    <div className="room-tabs">
      <div className="room-tabs__header">
        <h2 className="room-tabs__title">Forudindstillet</h2>
      </div>

      <div className="room-tabs__list">
          <button 
            className={`room-tabs__button ${activeMode === 'home' ? 'active' : ''}`}
            onClick={() => handleModeClick('home')}
          >
            <img src={`../public/icons/icon_home_${activeMode === 'home' ? 'on' : 'off'}.png`} alt="bedroom" />
            Hjemme
          </button>
          <button 
            className={`room-tabs__button ${activeMode === 'away' ? 'active' : ''}`}
            onClick={() => handleModeClick('away')}
          >
            <img src={`../public/icons/icon_away_${activeMode === 'away' ? 'on' : 'off'}.png`} alt="bedroom" />
            Ude
          </button>
          <button 
            className={`room-tabs__button ${activeMode === 'sleep' ? 'active' : ''}`}
            onClick={() => handleModeClick('sleep')}
          >
            <img src={`../public/icons/icon_sleep_${activeMode === 'sleep' ? 'on' : 'off'}.png`} alt="bedroom" />
            Sover
          </button>
      </div>
    </div>
  );
}