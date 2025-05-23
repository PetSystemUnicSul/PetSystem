import { useEffect, useState } from "react";
import { CirclePlus, Funnel, RotateCcw } from "lucide-react";
import AdicionarAgendamento from "../components/adicionarAgendamento";
import DetalhesAgendamento from "../components/detalhesAgendamento";
import CardAgendamentoDashboard from "./cardAgendamentoDashboard";
import axios from "axios";
import "../styles/clienteDashboard.css";

function AgendaDashboard() {
  const dataLocal = new Date();
  const hoje = dataLocal.toLocaleDateString('sv-SE');

  console.log(hoje);
  
  const [popupAberto, setPopupAberto] = useState(null);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);
  const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);
  const [dataFiltro, setDataFiltro] = useState(hoje);
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [loading, setLoading] = useState(false);

  const abrirPopupDetalhes = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setPopupAberto("detalhes");
  };

  const abrirPopupAdicionar = () => {
    setAgendamentoSelecionado(null); 
    setPopupAberto("adicionar");
  };

  const abrirPopupEditar = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setPopupAberto("adicionar");
  };

  const fecharPopup = () => {
    setPopupAberto(null);
    setAgendamentoSelecionado(null); 
  };

  const handleAtualizarAgendamentos = async () => {
    await buscarDadosAgendamentos();
  };

  async function buscarDadosAgendamentos() {
    setLoading(true);
    try {
      const response = await axios.get("https://petsystem-backend.onrender.com/agendamentos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDadosAgendamentos(response.data);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      alert("Erro ao carregar agendamentos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const formatarDataLocal = (dataUTC) => {
    if (typeof dataUTC === 'string' && dataUTC.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dataUTC;
    }
    
    const data = new Date(dataUTC);
    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    const dia = String(data.getUTCDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const converterHorarioParaMinutos = (horario) => {
    if (!horario || typeof horario !== 'string') return 0;
    
    const [horas, minutos] = horario.split(':').map(Number);
    return (horas || 0) * 60 + (minutos || 0);
  };

  const ordenarPorHorario = (agendamentos) => {
    return [...agendamentos].sort((a, b) => {
      const horarioA = converterHorarioParaMinutos(a.horario);
      const horarioB = converterHorarioParaMinutos(b.horario);
      return horarioA - horarioB;
    });
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

    const filtradosOrdenados = ordenarPorHorario(filtrados);
    setAgendamentosFiltrados(filtradosOrdenados);
  };

  const handleDataChange = (e) => {
    const data = e.target.value || null;
    setDataFiltro(data);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFiltro(status);
  };

  const resetarFiltros = () => {
    setDataFiltro(hoje);
    setStatusFiltro("todos");
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
          className={`btn-reset button`}
          onClick={resetarFiltros}
          title="Resetar filtros"
        >
          <RotateCcw size={25} />
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
        {loading ? (
          <div className="mensagem-carregando">Carregando agendamentos...</div>
        ) : agendamentosFiltrados.length > 0 ? (
          agendamentosFiltrados.map((agendamento, index) => (
            <CardAgendamentoDashboard
              key={agendamento._id || index}
              dadosAgendamento={agendamento}
              onClick={() => abrirPopupDetalhes(agendamento)}
            />
          ))
        ) : (
          <div className="mensagem-sem-resultados">
            {dadosAgendamentos.length === 0 
              ? "Nenhum agendamento cadastrado." 
              : "Nenhum agendamento encontrado com os filtros aplicados."
            }
          </div>
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
          onEditar={abrirPopupEditar}
        />
      )}
    </main>
  );
}

export default AgendaDashboard;