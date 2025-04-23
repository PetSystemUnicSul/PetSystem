import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
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

  const abrirPopupDetalhes = (agendamento) => {
    console.log(agendamento);
    setAgendamentoSelecionado(agendamento);
    setPopupAberto("detalhes");
  };

  const abrirPopupAdicionar = () => setPopupAberto("adicionar");
  const fecharPopup = () => setPopupAberto(null);

  const handleAtualizarAgendamentos = () => {
    buscarDadosAgendamentos(); // Atualiza após novo agendamento
  };

  async function buscarDadosAgendamentos() {
    try {
      const response = await axios.get("https://petsystem-backend.onrender.com/agendamentos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDadosAgendamentos(response.data);
      setAgendamentosFiltrados(response.data);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    }
  }

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

      <div className="groupFiltroCalen">
        <label htmlFor="inputdate">
          <input type="date" id="inputdate" className="filtroData"/>
        </label>
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
        />)}

        {popupAberto === "detalhes" && agendamentoSelecionado && (
          <DetalhesAgendamento
          dados={agendamentoSelecionado}
          onClose={fecharPopup}
        />)}
    </main>
  );
}

export default AgendaDashboard;
