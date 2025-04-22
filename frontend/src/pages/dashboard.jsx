import { useState } from "react";
import "../styles/dashboard.css";
import BarraLateral from "../components/barraLateral";
import AgendaDashboard from "../components/agendaDashboard";
import ClienteDashboard from "../components/clienteDashboard";
import Pets from "../components/petsDashboard";
import { AlignLeft} from "lucide-react";
import Perfil from "../components/perfil";

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
  }else if (activeButton === 'perfil') {
    content = <Perfil/>
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