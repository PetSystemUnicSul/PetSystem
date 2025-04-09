import { useState } from "react";
import "../styles/dashboard.css"
import BarraLateral from "../components/barraLateral";
import AgendaDashboard from "../components/AgendaDashboard";
import ClienteDashboard from "../components/clienteDashboard";

function Dashboard() {
  // Estado para controlar o botão ativo (por exemplo, 'agenda' ou 'clientes')
  const [activeButton, setActiveButton] = useState('agenda');

  // Escolha qual conteúdo renderizar com base no botão ativo
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
