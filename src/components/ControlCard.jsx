import { useNavigate } from "react-router-dom";

export default function ControlCard({ title, items, title2, items2, temp, mode, indstillinger = [] }) {
  const navigate = useNavigate();

  return (
    <div className="control-card">
      <div className="control-card__header">
        <h3 className="control-card__title">{title}</h3>
      </div>

      {items.map((item) => (
        <div key={item.name} className="control-card__item">
          <span className="control-card__item-name">{item.name}</span>

          <div className="control-card__item-controls">
            <label className="switch">
              <input type="checkbox" defaultChecked={item.on} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      ))}

      {title2 && items2.length > 0 && (
        <>
          <div className="control-card__header">
            <h3 className="control-card__title">{title2}</h3>
          </div>
          {items2.map((item2) => (
            <div key={item2.name} className="control-card__item">
              <span className="control-card__item-name">{item2.name}</span>

              <div className="control-card__item-controls">
                <label className="switch">
                  <input type="checkbox" defaultChecked={item2.on} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
        </>
      )}

      {temp && mode && indstillinger && (
        <div className="control-card__settings-section">
          <div className="control-card__temp">
            <img src="../public/icons/icon_temp.png" alt="temperature" />
            <div className="control-card__temp-info">
              <span>{temp}</span>
              <span className="control-card__mode">{mode}</span>
            </div>
          </div>
          <button className="control-card__settings-btn" onClick={() => navigate('/indstillinger')}>
            <img src="../public/icons/icon_temp-setting.png" alt="settings" />
            Indstillinger
          </button>
        </div>
      )}
    </div>
  );
}