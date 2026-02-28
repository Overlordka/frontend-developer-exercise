export default function EnergyCard() {
  return (
    <div className="energy-card">
      <div className="energy-card__title">
        Energi Forbrug
      </div>

      <div className="energy-card__content">
        <div className="energy-card__right">
          <button className="energy-card__button">
            <img src="../public/icons/icon_consumption_on.png" alt="consumption" />
          </button>
          <div className="energy-card__date">21 jan 2026</div>
        </div>

        <div className="energy-card__left">
          <div className="energy-card__consumption">29,3 <span className="energy-card__consumption-kwh">kWh</span></div>
          <div className="energy-card__comparison">23% mindre end i går</div>
        </div>
      </div>
    </div>
  );
}