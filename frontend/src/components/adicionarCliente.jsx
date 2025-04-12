import { SquareX, CirclePlus, Pencil, Trash2 } from "lucide-react";
import "../styles/adicionarCliente.css";

function AdicionarCliente({ onClose }) {
  return (
    <div className="popup-overlay">
        <div className="popup-container">
            <div className="popup-header">
                <h2>Adicionar Cliente</h2>

                <button className="btn-fechar" onClick={onClose}>
                    <SquareX size={24}/>
                </button>
            </div>

            <form className="form-cliente">
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" id="nome" placeholder="Digite o nome do cliente"/>
                </div>
                
                <div>
                    <label>Telefone:</label>
                    <input type="text" name="telefone" id="telefone" placeholder="(00) 00000-0000"/>
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" id="email" placeholder="exemplo@email.com"/>
                </div>

                <div>
                    <label>CPF:</label>
                    <input type="email" name="email" id="email" placeholder="000.000.000-00"/>
                </div>

                <div>
                    <label>Endereço:</label>
                    <input type="text" name="endereco" id="endereco" placeholder="Rua, número, bairro"/>
                </div>

                <div className="pets-relacionados">
                    <div className="pets-relacionados-top">
                        <label>Pets relacionados:</label>
        
                        <div className="pets-relacionados-buttons">
                            <button className="button-sm button">
                                <Pencil size={16}/>
                                Editar pet
                            </button>
                            <button className="button-sm button">
                                <CirclePlus size={16}/>
                                Adicionar pet
                            </button>
                        </div>
                        
                    </div>

                    <div className="lista-pets-relacionados">
                        <div className="pet-card">
                            <p>Pipow</p>
                            <button className="btn-remover-pet">
                                <Trash2 size={16} className="icon-remover-pet danger-button"/>
                            </button>
                        </div>

                        <div className="pet-card">
                            <p>Pelucia</p>
                            <button className="btn-remover-pet">
                                <Trash2 size={16} className="icon-remover-pet danger-button"/>
                            </button>
                        </div>
                    </div>
                </div>

                <button type="submit" className="button-md button">Salvar</button>
            </form>
        </div>
    </div>
  );
}

export default AdicionarCliente;
