import { SquareX } from "lucide-react";
import "../styles/detalhesCliente.css";

function DetalhesCliente({ onClose, pet }) {

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
              <p>{}</p>
            </div>
  
            <div className="detalhe">
              <label>Data:</label>
              <p>{}</p>
            </div>
  
            <div className="detalhe">
              <label>Hora:</label>
              <p>{}</p>
            </div>
  
            <div className="detalhe">
              <label>Pet:</label>
              <p>{pet?.sexo || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Cliente:</label>
              <p>{pet?.observacao|| "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Tutor:</label>
              <p>{pet?.clienteId.cliente_nome || "N/A"}</p>
            </div>
  
          </div>
        </div>
      </div>
    );
  }

export default DetalhesCliente;