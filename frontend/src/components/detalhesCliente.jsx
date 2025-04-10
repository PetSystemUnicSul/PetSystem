import { SquareX, Pencil, Trash2 } from "lucide-react";
import "../styles/detalhesCliente.css";

function DetalhesCliente({ onClose }) {
    return ( 
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h2>Detalhes do Cliente</h2>

                    <button className="btn-fechar" onClick={onClose}>
                        <SquareX size={24}/>
                    </button>
                </div>

                <div className="popup-detalhes">
                    <div>
                        <label>Nome:</label>
                        <p>Lucas Fernandes Ribeiro de Oliveira</p>
                    </div>

                    <div>
                        <label>Telefone:</label>
                        <p>Lucas Fernandes Ribeiro de Oliveira</p>
                    </div>

                    <div>
                        <label>CPF:</label>
                        <p>181.045.938-00</p>
                    </div>

                    <div>
                        <label>CPF:</label>
                        <p>lucas@gmail.com</p>
                    </div>

                    <div>
                        <label>Endereço:</label>
                        <p>Rua Fulano da Silva, 852</p>
                    </div>

                    <div>
                        <label>Pets:</label>
                        <p>Pipow</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesCliente;