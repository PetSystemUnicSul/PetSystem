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
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const handleAtualizarAgendamentos = () => {
    buscarDadosAgendamentos(); // Atualiza após novo agendamento
  };

  const handleSubmitAgendamento = (data) => {
    console.log("Agendamento enviado:", data);
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

  useEffect(() => {
    if (termoPesquisa === "") {
      setAgendamentosFiltrados(dadosAgendamentos);
      return;
    }

    const termo = termoPesquisa.toLowerCase();
    const filtrados = dadosAgendamentos.filter((agenda) =>
      agenda.cliente_nome?.toLowerCase().includes(termo)
    );

    setAgendamentosFiltrados(filtrados);
  }, [termoPesquisa, dadosAgendamentos]);

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const abrirPopupDetalhes = (agendamento) => {
    alert(`Detalhes do agendamento:\nCliente: ${agendamento.cliente_nome}\nPet: ${agendamento.pet_nome}\nServiço: ${agendamento.servico}\nData: ${agendamento.data}`);
  };

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
        <input
          type="text"
          className="inputData"
          placeholder="Buscar por nome do cliente"
          value={termoPesquisa}
          onChange={handlePesquisaChange}
        />
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
