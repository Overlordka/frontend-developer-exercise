import './styling/main.scss';
import { Routes, Route } from 'react-router-dom';
import StarterPage from './pages/starterPage';
import StatistikPage from './pages/statistikPage';
import IndstillingerPage from './pages/indstillingerPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/statistics" element={<StatistikPage />} />
        <Route path="/indstillinger" element={<IndstillingerPage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;