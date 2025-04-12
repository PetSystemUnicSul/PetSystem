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
                    <div className="detalhe">
                        <label>Nome:</label>
                        <p>Lucas Fernandes Ribeiro de Oliveira</p>
                    </div>

                    <div className="detalhe">
                        <label>Telefone:</label>
                        <p>(11) 98547-9584</p>
                    </div>

                    <div className="detalhe">
                        <label>Email:</label>
                        <p>lucas@gmail.com</p>
                    </div>

                    <div className="detalhe">
                        <label>CPF:</label>
                        <p>181.045.938-00</p>
                    </div>


                    <div className="detalhe">
                        <label>Endereço:</label>
                        <p>Rua Fulano da Silva, 852</p>
                    </div>

                    <div className="detalhe">
                        <label>Pets:</label>
                        <p>Pipow</p>
                    </div>

                    <div className="detalhes-buttons">
                        <button className="button button-md">
                            <Pencil size={16}/>
                            <span>Editar cliente</span>
                        </button>

                        <button className="button button-md danger-button">
                            <Trash2 size={16}/>
                            <span>Excluir cliente</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesCliente;