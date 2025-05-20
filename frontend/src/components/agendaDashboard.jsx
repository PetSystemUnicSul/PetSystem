import { useEffect, useState } from "react";
import { CirclePlus, Funnel, Trash2 } from "lucide-react";
import AdicionarAgendamento from "../components/adicionarAgendamento";
import DetalhesAgendamento from "../components/detalhesAgendamento";
import CardAgendamentoDashboard from "./cardAgendamentoDashboard";
import axios from "axios";
import "../styles/clienteDashboard.css";

function AgendaDashboard() {
  // Define a data inicial como hoje (formato YYYY-MM-DD)
  const hoje = new Date().toISOString().split('T')[0];
  
  const [popupAberto, setPopupAberto] = useState(null);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);
  const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);
  // Usa o filtro de data iniciando com hoje
  const [dataFiltro, setDataFiltro] = useState(hoje);
  const [statusFiltro, setStatusFiltro] = useState("todos");

  const abrirPopupDetalhes = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setPopupAberto("detalhes");
  };

  const abrirPopupAdicionar = () => setPopupAberto("adicionar");
  const fecharPopup = () => setPopupAberto(null);

  const handleAtualizarAgendamentos = () => {
    buscarDadosAgendamentos();
  };

  async function buscarDadosAgendamentos() {
    try {
      const response = await axios.get("https://petsystem-backend.onrender.com/agendamentos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDadosAgendamentos(response.data);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    }
  }

  const formatarDataLocal = (dataUTC) => {
    const data = new Date(dataUTC);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const filtrarAgendamentos = (
    dataSelecionada,
    agendamentos = dadosAgendamentos,
    statusSelecionado = statusFiltro
  ) => {
    const dataFiltroFormatada = dataSelecionada || null;

    const filtrados = agendamentos.filter((agendamento) => {
      const dataAgendamentoLocal = formatarDataLocal(agendamento.data);
      const status = (agendamento.status || "").toLowerCase();

      const correspondeData = !dataFiltroFormatada || dataAgendamentoLocal === dataFiltroFormatada;
      const correspondeStatus = statusSelecionado === "todos" || status === statusSelecionado.toLowerCase();

      return correspondeData && correspondeStatus;
    });

    setAgendamentosFiltrados(filtrados);
  };

  const handleDataChange = (e) => {
    const data = e.target.value || null;
    setDataFiltro(data);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFiltro(status);
  };

  useEffect(() => {
    buscarDadosAgendamentos();
  }, []);

  useEffect(() => {
    filtrarAgendamentos(dataFiltro, dadosAgendamentos, statusFiltro);
  }, [dataFiltro, dadosAgendamentos, statusFiltro]);

  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloAgenda">Agendamento</h1>
          <button className="buttonAdicionar" onClick={abrirPopupAdicionar}>
            <CirclePlus size={18} />
            <span>Novo Agendamento</span>
          </button>
        </div>
      </div>

      <div className="searchEfiltro">
        <div className="groupFiltroCalen">
          <label htmlFor="inputdate">
            <input
              type="date"
              id="inputdate"
              className="inputData"
              value={dataFiltro || ''}
              onChange={handleDataChange}
            />
          </label>
        </div>

        <button
          className={`btn-lixeira ${dataFiltro ? 'ativo' : ''}`}
          // Agora reinicia para o dia de hoje em vez de limpar totalmente
          onClick={() => setDataFiltro(hoje)}
        >
          <Trash2 size={25} />
        </button>

        <div className="campoFiltro">
          <select
            name="filtroStatus"
            id="filtroStatus"
            className="filtroStatus"
            value={statusFiltro}
            onChange={handleStatusChange}
          >
            <option value="todos">Todos</option>
            <option value="agendado">Agendado</option>
            <option value="concluído">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <Funnel size={40} className="iconFiltro" />
        </div>
      </div>

      <div className="listAgendamentos">
        {agendamentosFiltrados.map((agendamento, index) => (
          <CardAgendamentoDashboard
            key={index}
            dadosAgendamento={agendamento}
            onClick={() => abrirPopupDetalhes(agendamento)}
          />
        ))}

        {agendamentosFiltrados.length === 0 && (
          <div className="mensagem-sem-resultados">Nenhum agendamento encontrado.</div>
        )}
      </div>

      {popupAberto === "adicionar" && (
        <AdicionarAgendamento
          onClose={fecharPopup}
          onAtualizarAgendamentos={handleAtualizarAgendamentos}
          agendamentoParaEditar={agendamentoSelecionado}
        />
      )}

      {popupAberto === "detalhes" && agendamentoSelecionado && (
        <DetalhesAgendamento
          dados={agendamentoSelecionado}
          onClose={fecharPopup}
          onAtualizarAgendamentos={handleAtualizarAgendamentos}
          setPopupAberto={setPopupAberto}
          setAgendamentoSelecionado={setAgendamentoSelecionado}
        />
      )}
    </main>
  );
}

export default AgendaDashboard;
