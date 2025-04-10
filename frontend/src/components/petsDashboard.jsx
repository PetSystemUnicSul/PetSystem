import { Search, Funnel, CirclePlus } from "lucide-react";
import "../styles/clienteDashboard.css";

function ClienteDashboard() {
  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloPet">Pets</h1>
        </div>
        <div className="searchEfiltro">
          <div className="campoSearch">
            <input type="text" placeholder="Buscar Pets..." />
            <Search size={25} className="iconeSearch" />
          </div>
        </div>
      </div>
      <div className="listClientes">Pets...</div>
    </main>
  );
}

export default ClienteDashboard;
