import { SquareX } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import "../styles/detalhesCliente.css";

function DetalhesCliente({ onClose, dados, onAtualizarAgendamentos, setPopupAberto, setAgendamentoSelecionado }) {
  const [processando, setProcessando] = useState(false);

  const atualizarStatus = async (novoStatus) => {
    setProcessando(true);
    try {
      await axios.post(
        `https://petsystem-backend.onrender.com/agendamentos/${dados._id}`,
        { status: novoStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTimeout(() => {
        setProcessando(false);
        onAtualizarAgendamentos();
        onClose();
      }, 500);
    } catch (error) {
      console.error(
        `Erro ao ${
          novoStatus === "Concluído" ? "concluir" : "cancelar"
        } o agendamento:`,
        error
      );
      setProcessando(false);
      alert(
        `Erro ao ${
          novoStatus === "Concluído" ? "concluir" : "cancelar"
        } o agendamento. Por favor, tente novamente.`
      );
    }
  };

  const handleConcluir = () => atualizarStatus("Concluído");
  const handleCancelar = () => atualizarStatus("Cancelado");

  const handleEditar = () => {
    setAgendamentoSelecionado(dados);
    setPopupAberto("adicionar");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Detalhes do Agendamento</h2>
          <button
            className="btn-fechar"
            onClick={onClose}
            disabled={processando}
          >
            <SquareX size={24} />
          </button>
        </div>

        <div className="popup-detalhes">
          <div className="detalhe">
            <label>Serviço:</label>
            <p>{dados.servico}</p>
          </div>

          <div className="detalhe">
            <label>Data:</label>
            <p>{dados.data}</p>
          </div>

          <div className="detalhe">
            <label>Hora:</label>
            <p>{dados.horario}</p>
          </div>

          <div className="detalhe">
            <label>Pet:</label>
            <p>{dados.petId.pet_nome}</p>
          </div>

          <div className="detalhe">
            <label>Especie:</label>
            <p>{dados.petId.especie}</p>
          </div>

          <div className="detalhe">
            <label>Tutor:</label>
            <p>{dados.clienteId.cliente_nome}</p>
          </div>

          <div className="detalhe">
            <label>Status:</label>
            <p className={`status-${dados.status?.toLowerCase()}`}>
              {dados.status || "Agendado"}
            </p>
          </div>
        </div>

        <div className="btn-detalhes-agendamento">
          <button
            className="button button-sm btn-concluido"
            onClick={handleConcluir}
          >
            {processando ? "Processando..." : "Concluído"}
          </button>
          <button className="danger-btn-sm" onClick={handleCancelar}>
            {processando ? "Processando..." : "Cancelar"}
          </button>
          <button className="button button-sm" onClick={handleEditar}>Editar</button>
        </div>
      </div>
    </div>
  );
}

export default DetalhesCliente;
