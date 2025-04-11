import { useState } from "react";
import AdicionarCliente from "../components/adicionarCliente";
import { Search, Funnel, CirclePlus } from "lucide-react";
import CardClienteDashboard from "./cardClienteDashboard";
import "../styles/clienteDashboard.css";

function ClienteDashboard() {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const abrirPopup = () => setMostrarPopup(true);
  const fecharPopup = () => setMostrarPopup(false);

  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloCliente">Clientes</h1>
          <button className="buttonAdicionar" onClick={abrirPopup}>
            <CirclePlus size={18} />
            <span>Novo cliente</span>
          </button>
        </div>

        <div className="searchEfiltro">
          <div className="campoSearch">
            <input type="text" placeholder="Buscar cliente..." />
            <Search size={25} className="iconeSearch" />
          </div>
          <div className="campoFiltro">
            <select name="filtroCliente" id="filtroClientes" className="filtroClientes">
              <option value="Nome">Nome</option>
              <option value="Telefone">Telefone</option>
              <option value="Endereço">Endereço</option>
            </select>
            <Funnel size={40} className="iconFiltro" />
          </div>
        </div>
      </div>

      <div className="bar">
        <p>Nome</p>
        <p>Pets</p>
        <p>Telefone</p>
        <p>Endereço</p>
        <p>Editar</p>
      </div>

      <div className="listCliente">
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
        <CardClienteDashboard />
      </div>

      {mostrarPopup && <AdicionarCliente onClose={fecharPopup} />}
    </main>
  );
}

export default ClienteDashboard;