import { useEffect, useState } from "react";
import { CirclePlus, Funnel } from "lucide-react";
import AdicionarAgendamento from "../components/adicionarAgendamento";
import DetalhesAgendamento from "../components/detalhesAgendamento";
import CardAgendamentoDashboard from "./cardAgendamentoDashboard";
import axios from "axios";
import "../styles/clienteDashboard.css";

function AgendaDashboard() {
  const [popupAberto, setPopupAberto] = useState(null);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);
  const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);
  const [dataFiltro, setDataFiltro] = useState(new Date().toISOString().split("T")[0]);
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
      filtrarAgendamentos(dataFiltro, response.data, statusFiltro);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    }
  }

  const filtrarAgendamentos = (
    dataSelecionada,
    agendamentos = dadosAgendamentos,
    statusSelecionado = statusFiltro
  ) => {
    const dataISO = new Date(dataSelecionada).toISOString().split("T")[0];

    const filtrados = agendamentos.filter((agendamento) => {
      const dataAgendamento = new Date(agendamento.data).toISOString().split("T")[0];
      const status = agendamento.status?.toLowerCase();
      const correspondeData = dataAgendamento === dataISO;
      const correspondeStatus = statusSelecionado === "todos" || status === statusSelecionado;

      return correspondeData && correspondeStatus;
    });

    setAgendamentosFiltrados(filtrados);
  };

  const handleDataChange = (e) => {
    const data = e.target.value;
    setDataFiltro(data);
    filtrarAgendamentos(data, dadosAgendamentos, statusFiltro);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFiltro(status);
    filtrarAgendamentos(dataFiltro, dadosAgendamentos, status);
  };

  useEffect(() => {
    buscarDadosAgendamentos();
  }, []);

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
              className="filtroData"
              value={dataFiltro}
              onChange={handleDataChange}
            />
          </label>
        </div>

        <div className="campoFiltro">
          <select
            name="filtroStatus"
            id="filtroStatus"
            className="filtroStatus"
            value={statusFiltro}
            onChange={handleStatusChange}
          >
            <option value="todos">Todos</option>
            <option value="agendado">Agendados</option>
            <option value="concluído">Concluídos</option>
            <option value="cancelado">Cancelados</option>
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
