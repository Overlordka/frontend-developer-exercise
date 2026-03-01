
export default function ControlCard({ title, items, title2, items2, temp, indstillinger = [] }) {
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

      {temp && indstillinger && (
        <div className="control-card__settings-section">
          <div className="control-card__temp">
            <img src="../public/icons/icon_temp.png" alt="temperature" />
            <span>{temp}</span>
          </div>
          <button className="control-card__settings-btn">
            <img src="../public/icons/icon_temp-setting.png" alt="settings" />
            Indstillinger
          </button>
        </div>
      )}
    </div>
  );
}