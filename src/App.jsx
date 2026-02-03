import './styling/main.scss';
import Header from './components/Header';
import EnergyCard from './components/EnergyCard';
import RoomTabs from './components/RoomTabs';
import ModeSelector from './components/ModeSelector';
import SmartSection from './components/SmartSection';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="container">
      <Header />
      <EnergyCard />
      <RoomTabs />
      <ModeSelector />
      <SmartSection />
      <BottomNav />
    </div>
  );
}

export default App;