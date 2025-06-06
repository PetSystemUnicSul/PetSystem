import { SquareX } from "lucide-react";
import "../styles/detalhesCliente.css";

function DetalhesCliente({ onClose, pet }) {
    const calcularIdade = (anoNascimento) => {
      if (!anoNascimento) return "N/A";
      const anoAtual = new Date().getFullYear();
      return anoAtual - Number(anoNascimento);
    };

    return (
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2>Detalhes do Pet</h2>
            <button className="btn-fechar" onClick={onClose}>
              <SquareX size={24} />
            </button>
          </div>
  
          <div className="popup-detalhes">
            <div className="detalhe">
              <label>Pet:</label>
              <p>{pet?.pet_nome || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Especie:</label>
              <p>{pet?.especie || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Raça:</label>
              <p>{pet?.raca || "N/A"}</p>
            </div>

            <div className="detalhe">
              <label>Ano de nascimento:</label>
              <p>{pet?.idade || "N/A"}</p>
            </div>

            <div className="detalhe">
              <label>Idade:</label>
              <p>{pet?.idade ? calcularIdade(pet.idade) + " anos" : "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Sexo:</label>
              <p>{pet?.sexo || "N/A"}</p>
            </div>
  
            <div className="detalhe">
              <label>Observação:</label>
              <p>{pet?.observacao || "Sem obsevação"}</p>
            </div>
  
            <div className="detalhe">
              <label>Tutor:</label>
              <p>{pet?.clienteId?.cliente_nome || "N/A"}</p>
            </div>
  
          </div>
        </div>
      </div>
    );
  }

export default DetalhesCliente;