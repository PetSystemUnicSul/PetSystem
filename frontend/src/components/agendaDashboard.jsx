import { Search, CirclePlus } from "lucide-react";
import "../styles/clienteDashboard.css";

function AgendaDashboard() {
  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloAgenda">Agendameto</h1>
          <button className="buttonAdicionar">
            <CirclePlus size={18} />
            <span>Novo Agendamento</span>
          </button>
        </div>
      </div>
      <div className="groupFiltroCalen">
        <input type="date" id="inputData" className="inputData"/>
      </div>
      <div className="listClientes">calendario...</div>
    </main>
  );
}

export default AgendaDashboard;
