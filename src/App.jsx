import './styling/main.scss';
import { Routes, Route } from 'react-router-dom';
import StarterPage from './pages/starterPage';
import StatistikPage from './pages/statistikPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/statistics" element={<StatistikPage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;