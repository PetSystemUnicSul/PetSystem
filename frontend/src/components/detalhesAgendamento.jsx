import { SquareX } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import "../styles/detalhesCliente.css";

function DetalhesAgendamento({ onClose, dados, onAtualizarAgendamentos, onEditar }) {
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
    onEditar(dados);
  };

  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString("pt-BR");
  };

  const podeEditar = dados.status !== "Concluído" && dados.status !== "Cancelado";
  const podeConcluir = dados.status !== "Concluído";
  const podeCancelar = dados.status !== "Cancelado";

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
            <p>{dados.servico || "Não informado"}</p>
          </div>

          <div className="detalhe">
            <label>Data:</label>
            <p>{formatarData(dados.data)}</p>
          </div>

          <div className="detalhe">
            <label>Hora:</label>
            <p>{dados.horario || "Não informado"}</p>
          </div>

          <div className="detalhe">
            <label>Pet:</label>
            <p>{dados.petId?.pet_nome || "Não informado"}</p>
          </div>

          <div className="detalhe">
            <label>Espécie:</label>
            <p>{dados.petId?.especie || "Não informado"}</p>
          </div>

          <div className="detalhe">
            <label>Tutor:</label>
            <p>{dados.clienteId?.cliente_nome || "Não informado"}</p>
          </div>

          <div className="detalhe">
            <label>Status:</label>
            <p className={`status-${dados.status?.toLowerCase() || 'agendado'}`}>
              {dados.status || "Agendado"}
            </p>
          </div>
        </div>

        <div className="btn-detalhes-agendamento">
          {podeConcluir && (
            <button
              className="button button-sm btn-concluido"
              onClick={handleConcluir}
              disabled={processando}
            >
              {processando ? "Processando..." : "Concluído"}
            </button>
          )}
          
          {podeCancelar && (
            <button 
              className="danger-btn-sm" 
              onClick={handleCancelar}
              disabled={processando}
            >
              {processando ? "Processando..." : "Cancelar"}
            </button>
          )}
          
          {podeEditar && (
            <button 
              className="button button-sm" 
              onClick={handleEditar}
              disabled={processando}
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesAgendamento;