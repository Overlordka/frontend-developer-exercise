
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentEnergyConsumption } from '../scripts/fetch.js';

export default function EnergyCard() {
  const [energyConsumption, setEnergyConsumption] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEnergyData = async () => {
      try {
        const data = await fetchCurrentEnergyConsumption();
        setEnergyConsumption(data);
      } catch (error) {
        console.error('Failed to load energy data:', error);
      }
    };

    loadEnergyData();
  }, []);

  console.log('Current Energy Consumption:', energyConsumption);

  const lastEnergyItem = Array.isArray(energyConsumption) && energyConsumption.length > 0
    ? energyConsumption[energyConsumption.length - 1]
    : null;
  const previousEnergyItem = Array.isArray(energyConsumption) && energyConsumption.length > 1
    ? energyConsumption[energyConsumption.length - 2]
    : null;
  const currentDate = lastEnergyItem?.date;
  const currentConsumption = lastEnergyItem?.kwh_usage;
  const previousConsumption = previousEnergyItem?.kwh_usage;


  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }

    const [year, month, day] = dateString.split("-");
    const monthMap = {
      "01": "jan",
      "02": "feb",
      "03": "mar",
      "04": "apr",
      "05": "maj",
      "06": "jun",
      "07": "jul",
      "08": "aug",
      "09": "sep",
      "10": "okt",
      "11": "nov",
      "12": "dec",
    };

    const shortMonth = monthMap[month] ?? month;
    return `${day} ${shortMonth} ${year}`;
  }

  const formattedDate = formatDate(currentDate);

  function formatComparisonText(currentValue, previousValue) {
    if (typeof currentValue !== "number" || typeof previousValue !== "number") {
      return "Ingen data fra i går";
    }

    if (previousValue === 0) {
      return currentValue === 0 ? "Samme som i går" : "Ingen data fra i går";
    }

    const percentDiff = ((currentValue - previousValue) / previousValue) * 100;
    const absPercent = Math.abs(percentDiff).toFixed(0);

    if (percentDiff < 0) {
      return `${absPercent}% mindre end i går`;
    }

    if (percentDiff > 0) {
      return `${absPercent}% mere end i går`;
    }

    return "Samme som i går";
  }

  const comparisonText = formatComparisonText(currentConsumption, previousConsumption);


  return (
    <div className="energy-card">
      <div className="energy-card__title">
        Energi Forbrug
      </div>

      <div className="energy-card__content">
        <div className="energy-card__right">
          <button className="energy-card__button" onClick={() => navigate("/statistics")}>
            <img src="../public/icons/icon_consumption_on.png" alt="consumption" />
          </button>
          <div className="energy-card__date">{formattedDate}</div>
        </div>

        <div className="energy-card__left">
          <div className="energy-card__consumption">{currentConsumption?.toFixed(1) || "0,0"} <span className="energy-card__consumption-kwh">kWh</span></div>
          <div className="energy-card__comparison" style={{color: comparisonText.includes('mere') ? 'red' : 'lightgreen'}}>
            {comparisonText}
          </div>
        </div>
      </div>
    </div>
  );
}