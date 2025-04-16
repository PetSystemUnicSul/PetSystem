import { useState, useEffect } from "react";
import { SquareX, CirclePlus, Pencil } from "lucide-react";
import "../styles/adicionarCliente.css";
import CardPet from "../components/cardPet";
import AdicionarPet from "./adicionarPet";

function AdicionarCliente({ onClose }) {
    const [popupAberto, setPopupAberto] = useState(null);
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        cpf: "",
        endereco: "",
    });
    const [pets, setPets] = useState([]);
    const [petSelecionado, setPetSelecionado] = useState(null);

    const abrirPopupAdicionar = () => setPopupAberto("adicionarPet");
    const fecharPopup = () => setPopupAberto(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const adicionarNovoPet = (pet) => {
        setPets(prevPets => [...prevPets, pet]);
        fecharPopup();
    };

    const removerPet = (index) => {
        setPets(prevPets => prevPets.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dadosCliente = {
            dadosClientes: {
                nome: formData.nome,
                telefone: formData.telefone,
                email: formData.email,
                CPF: formData.cpf,
                endereco: formData.endereco,
                pets: pets.map(pet => ({
                    pet_nome: pet.nomePet,
                    especie: pet.especie,
                    raca: pet.raca,
                    sexo: pet.sexo,
                    observacao: pet.observacoesPet
                }))
            }
        };

        console.log(JSON.stringify(dadosCliente, null, 2));
        onClose(); // Fechar o formulário após salvar
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h2>Adicionar Cliente</h2>

                    <button className="btn-fechar" onClick={onClose}>
                        <SquareX size={24}/>
                    </button>
                </div>

                <form className="form-cliente" onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input 
                            type="text" 
                            name="nome" 
                            id="nome" 
                            placeholder="Digite o nome do cliente"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div>
                        <label>Telefone:</label>
                        <input 
                            type="text" 
                            name="telefone" 
                            id="telefone" 
                            placeholder="(00) 00000-0000"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="exemplo@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>CPF:</label>
                        <input 
                            type="text" 
                            name="cpf" 
                            id="cpf" 
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Endereço:</label>
                        <input 
                            type="text" 
                            name="endereco" 
                            id="endereco" 
                            placeholder="Rua, número"
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pets-relacionados">
                        <div className="pets-relacionados-top">
                            <label>Pets relacionados:</label>
            
                            <div className="pets-relacionados-buttons">
                                <button type="button" className="button-sm button">
                                    <Pencil size={16}/>
                                    Editar pet
                                </button>
                                <button type="button" className="button-sm button" onClick={abrirPopupAdicionar}>
                                    <CirclePlus size={16}/>
                                    Adicionar pet
                                </button>
                            </div>
                            
                        </div>

                        <div className="lista-pets-relacionados">
                            {pets.length > 0 ? (
                                pets.map((pet, index) => (
                                    <CardPet 
                                        key={index} 
                                        nome={pet.nomePet} 
                                        onRemover={() => removerPet(index)}
                                    />
                                ))
                            ) : (
                                <p>Nenhum pet adicionado</p>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="button-md button">Salvar</button>
                </form>
            </div>
            {popupAberto === "adicionarPet" && (
                <AdicionarPet 
                    onClose={fecharPopup} 
                    onSalvar={adicionarNovoPet}
                />
            )}
        </div>
    );
}

export default AdicionarCliente;