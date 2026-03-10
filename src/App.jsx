import './styling/main.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import StarterPage from './pages/starterPage';
import StatistikPage from './pages/statistikPage';
import IndstillingerPage from './pages/indstillingerPage';
import BottomNav from './components/BottomNav';
import { fetchCurrentEnergyConsumption } from './scripts/fetch.js';

function App() {
  const location = useLocation();
  const shouldShowBottomNav = !location.pathname.startsWith('/indstillinger');

  fetchCurrentEnergyConsumption();

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/statistics" element={<StatistikPage />} />
        <Route path="/indstillinger" element={<IndstillingerPage />} />
      </Routes>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
}

export default App;