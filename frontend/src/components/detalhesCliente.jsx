import { SquareX, Pencil, Trash2 } from "lucide-react";
import "../styles/detalhesCliente.css";

function DetalhesCliente({ onClose, cliente, deleteCliente }) {

      function handleDelete() {
      deleteCliente(cliente.id)
      onClose()
    }


    return (
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2>Detalhes do Cliente</h2>
            <button className="btn-fechar" onClick={onClose}>
              <SquareX size={24} />
            </button>
          </div>
  
          <div className="popup-detalhes">
            <div className="detalhe">
              <label>Nome:</label>
              <p>{cliente?.tutor || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Telefone:</label>
              <p>{cliente?.telefone || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Email:</label>
              <p>{cliente?.email || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>CPF:</label>
              <p>{cliente?.cpf || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Endereço:</label>
              <p>{cliente?.endereco || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Pets:</label>
              <p>{cliente.pets.map((p) => p.pet_nome).join(", ")}</p>
            </div>
  
            <div className="detalhes-buttons">
              <button className="button button-md">
                <Pencil size={16} />
                <span>Editar cliente</span>
              </button>
  
              <button className="button button-md danger-button" onClick={() => handleDelete()}>
                <Trash2 size={16} />
                <span>Excluir cliente</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default DetalhesCliente;