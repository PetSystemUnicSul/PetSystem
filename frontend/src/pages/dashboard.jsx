import { useState } from "react";
import "../styles/dashboard.css"
import BarraLateral from "../components/barraLateral";
import AgendaDashboard from "../components/AgendaDashboard";
import ClienteDashboard from "../components/clienteDashboard";

function Dashboard() {
  const [activeButton, setActiveButton] = useState('agenda');

  let content;
  if (activeButton === 'agenda') {
    content = <AgendaDashboard />;
  } else if (activeButton === 'clientes') {
    content = <ClienteDashboard />;
  }

  return (
    <div className="dashboardContainer">
      <BarraLateral activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="contentDashboard">
        {content}
      </div>
    </div>
  );
}

export default Dashboard;
