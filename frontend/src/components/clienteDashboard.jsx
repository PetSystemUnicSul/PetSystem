import { Search, Funnel } from "lucide-react";
import "../styles/clienteDashboard.css";

function ClienteDashboard() {
  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEbuttonAdicCliente">
          <h2>Clientes</h2>
          <button className="buttonAdicionar">adicionar cliente</button>
        </div>
        <div className="searchEfiltro">
          <div className="campoSearch">
            <input type="search" />
            <Search size={32} />
          </div>
          <div>
            <select name="filtroCliente" id="filtroClientes">
              <option value="Nome">Nome</option>
              <option value="Telefone">Telefone</option>
              <option value="CPF">CPF</option>
              <option value="Email">Email</option>
              <option value="Endereço">Endereço</option>
            </select>
            <Funnel size={32} />
          </div>
        </div>
      </div>
      <div className="listClientes">clientes...</div>
    </main>
  );
}

export default ClienteDashboard;
