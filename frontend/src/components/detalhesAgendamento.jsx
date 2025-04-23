import { SquareX } from "lucide-react";
import "../styles/detalhesCliente.css";

function DetalhesCliente({ onClose, dados }) {

    return (
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2>Detalhes do Agendamento</h2>
            <button className="btn-fechar" onClick={onClose}>
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
          </div>
        </div>
      </div>
    );
  }

export default DetalhesCliente;