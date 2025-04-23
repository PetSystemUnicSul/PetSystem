import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import AdicionarAgendamento from "../components/adicionarAgendamento";
import CardAgendamentoDashboard from "./cardAgendamentoDashboard";
import axios from "axios";
import "../styles/clienteDashboard.css";

function AgendaDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);
  const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);

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
          <button className="buttonAdicionar" onClick={() => setShowModal(true)}>
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
            onClick={() => abrirPopupDetalhes(agendamento)}
            key={index}
            dadosAgendamento={agendamento}
          />
        ))}

        {agendamentosFiltrados.length === 0 && (
          <div className="mensagem-sem-resultados">Nenhum agendamento encontrado.</div>
        )}
      </div>

      {showModal && (
        <AdicionarAgendamento
          onClose={() => setShowModal(false)}
          onAtualizarAgendamentos={handleAtualizarAgendamentos}
        />
      )}
    </main>
  );
}

export default AgendaDashboard;
