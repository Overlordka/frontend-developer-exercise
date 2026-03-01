import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const getIcon = (type) => {
    if (type === 'dashboard') {
      return isActive('/') 
        ? '../public/icons/icon_menu_dashboad_active.png'
        : '../public/icons/icon_menu_dashboad_inactive.png';
    }
    if (type === 'statistics') {
      return isActive('/statistics')
        ? '../public/icons/icon_menu_statistics_active.png'
        : '../public/icons/icon_menu_statistics_inactive.png';
    }
    return '../public/icons/icon_menu_heating.png';
  };

  return (
    <nav className="bottom-nav">
      <button 
        className="bottom-nav__button"
        onClick={() => navigate('/')}
      >
        <img src={getIcon('dashboard')} alt="dashboard" />
      </button>
      <button 
        className="bottom-nav__button"
        onClick={() => navigate('/statistics')}
      >
        <img src={getIcon('statistics')} alt="statistics" />
      </button>
      <button className="bottom-nav__button">
        <img src="../public/icons/icon_menu_heating.png" alt="heating" />
      </button>
      <button className="bottom-nav__button">
        <img src="../public/icons/icon_menu_light.png" alt="light" />
      </button>
    </nav>
  );
}