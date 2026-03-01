import Header from '../components/Header';
import EnergyCard from '../components/EnergyCard';
import RoomTabs from '../components/RoomTabs';
import ModeSelector from '../components/ModeSelector';
import SmartSection from '../components/SmartSection';

export default function StarterPage() {
  return (
    <>
      <Header />
      <EnergyCard />
      <RoomTabs />
      <ModeSelector />
      <SmartSection />
    </>
  );
}