import { useState } from "react";
import "../styles/dashboard.css";
import BarraLateral from "../components/barraLateral";
import AgendaDashboard from "../components/agendaDashboard";
import ClienteDashboard from "../components/clienteDashboard";
import Pets from "../components/petsDashboard";
import { AlignJustify, AlignLeft} from "lucide-react";

function Dashboard() {
  const [activeButton, setActiveButton] = useState('agenda');
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let content;
  if (activeButton === 'agenda') {
    content = <AgendaDashboard />;
  } else if (activeButton === 'clientes') {
    content = <ClienteDashboard />;
  } else if (activeButton === 'pets') {
    content = <Pets />;
  }

  return (
    <div className="dashboardContainer">
      <AlignLeft 
        strokeWidth={3} 
        size={30} 
        className="iconMenu" 
        onClick={toggleMenu}
      />
      <div className={`sidebarWrapper ${showMenu ? 'visible' : 'hidden'}`}>
        <BarraLateral 
          activeButton={activeButton} 
          setActiveButton={setActiveButton}
        />
      </div>
      <div className="contentDashboard">
        {content}
      </div>
    </div>
  );
}

export default Dashboard;