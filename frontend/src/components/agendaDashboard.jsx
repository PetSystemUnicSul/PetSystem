import { useState } from "react";
import { CirclePlus } from "lucide-react";
import AdicionarAgendamento from "../components/adicionarAgendamento";
import "../styles/clienteDashboard.css";

function AgendaDashboard() {
  const [showModal, setShowModal] = useState(false);

  // Função para atualizar os agendamentos após adicionar um novo
  const handleAtualizarAgendamentos = () => {
    console.log("Atualizando agendamentos...");
    // Aqui você pode adicionar a lógica de atualização dos agendamentos, por exemplo, fazendo uma nova requisição para o backend.
  };

  const handleSubmitAgendamento = (data) => {
    console.log("Agendamento enviado:", data);
    // Aqui você pode fazer a requisição para o backend para salvar o agendamento.
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
        <input type="date" id="inputData" className="inputData" />
      </div>

      <div className="listClientes">calendario...</div>

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

