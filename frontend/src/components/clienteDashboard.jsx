import { useState, useEffect } from "react";
import AdicionarCliente from "../components/adicionarCliente";
import DetalhesCliente from "../components/detalhesCliente";
import { Search, Funnel, CirclePlus } from "lucide-react";
import CardClienteDashboard from "./cardClienteDashboard";
import "../styles/clienteDashboard.css";
import axios from "axios";

function ClienteDashboard() {
  const [popupAberto, setPopupAberto] = useState(null);
  const [dadosClientes, setDadosClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("Nome");
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const abrirPopupDetalhes = (cliente) => {
    setClienteSelecionado(cliente);
    setPopupAberto("detalhes");
  };

  const abrirPopupAdicionar = () => setPopupAberto("adicionar");
  const fecharPopup = () => setPopupAberto(null);

  async function buscarDadosClientes() {
    try {
      const response = await axios.get("https://petsystem-backend.onrender.com/clientes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDadosClientes(response.data);
      setClientesFiltrados(response.data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  }

  useEffect(() => {
    buscarDadosClientes();
  }, []);

  useEffect(() => {
    if (termoPesquisa === "") {
      setClientesFiltrados(dadosClientes);
      return;
    }

    const termoMinusculo = termoPesquisa.toLowerCase();
    let resultado = [];

    switch (campoFiltro) {
      case "Nome":
        resultado = dadosClientes.filter((cliente) =>
          cliente.tutor.toLowerCase().includes(termoMinusculo)
        );
        break;
      case "Telefone":
        resultado = dadosClientes.filter((cliente) =>
          cliente.telefone.toLowerCase().includes(termoMinusculo)
        );
        break;
      case "Endereço":
        resultado = dadosClientes.filter((cliente) =>
          cliente.endereco.toLowerCase().includes(termoMinusculo)
        );
        break;
      default:
        resultado = dadosClientes;
    }

    setClientesFiltrados(resultado);
  }, [termoPesquisa, campoFiltro, dadosClientes]);

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const handleFiltroChange = (e) => {
    setCampoFiltro(e.target.value);
  };

  async function deletarCliente(clienteId) {
    try {
      await axios.delete(`https://petsystem-backend.onrender.com/${clienteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      buscarDadosClientes();
    } catch (err) {
      console.error("Erro ao deletar cliente:", err);
    }
  }

  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloCliente">Clientes</h1>
          <button className="buttonAdicionar" onClick={abrirPopupAdicionar}>
            <CirclePlus size={18} />
            <span>Novo cliente</span>
          </button>
        </div>

        <div className="searchEfiltro">
          <div className="campoSearch">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={termoPesquisa}
              onChange={handlePesquisaChange}
            />
            <Search size={25} className="iconeSearch" />
          </div>
          <div className="campoFiltro">
            <select
              name="filtroCliente"
              id="filtroClientes"
              className="filtroClientes"
              value={campoFiltro}
              onChange={handleFiltroChange}
            >
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
      </div>

      <div className="listCliente">
        {clientesFiltrados.map((cliente, index) => (
          <CardClienteDashboard
            onClick={() => abrirPopupDetalhes(cliente)}
            key={index}
            dadoCliente={cliente}
          />
        ))}

        {clientesFiltrados.length === 0 && (
          <div className="mensagem-sem-resultados">
            Nenhum cliente encontrado.
          </div>
        )}
      </div>

      {popupAberto === "adicionar" && (<AdicionarCliente onClose={fecharPopup} onAtualizarCliete={buscarDadosClientes} />)}
      {popupAberto === "detalhes" && (<DetalhesCliente onClose={fecharPopup} cliente={clienteSelecionado} deleteCliente={deletarCliente} />)}
    </main>
  );
}

export default ClienteDashboard;
