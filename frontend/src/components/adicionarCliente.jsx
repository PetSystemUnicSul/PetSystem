import { useState, useEffect } from "react";
import { SquareX, CirclePlus, Pencil } from "lucide-react";
import "../styles/adicionarCliente.css";
import CardPet from "../components/cardPet";
import AdicionarPet from "./adicionarPet";
import axios from "axios";

function AdicionarCliente({ onClose, onAtualizarCliete, clienteParaEditar }) {
  const [popupAberto, setPopupAberto] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    endereco: "",
  });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (clienteParaEditar) {
      setFormData({
        nome: clienteParaEditar.tutor || "",
        telefone: clienteParaEditar.telefone || "",
        email: clienteParaEditar.email || "",
        cpf: clienteParaEditar.cpf || clienteParaEditar.CPF || "",
        endereco: clienteParaEditar.endereco || "",
      });
      setPets(clienteParaEditar.pets || []);
    }
  }, [clienteParaEditar]);

  const abrirPopupAdicionar = () => setPopupAberto("adicionarPet");
  const fecharPopup = () => setPopupAberto(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const adicionarNovoPet = (pet) => {
    setPets((prevPets) => [...prevPets, pet]);
    fecharPopup();
  };

  const removerPet = (index) => {
    setPets((prevPets) => prevPets.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.id) {
        alert("Usuário não encontrado. Faça login novamente.");
        return;
      }

      const petshopId = userData.id;
      
      const dadosCliente = {
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        CPF: formData.cpf,
        endereco: formData.endereco,
        petshopId: petshopId,
        pets: pets.map((pet) => ({
          _id: pet._id,
          pet_nome: pet.pet_nome || pet.nomePet,
          especie: pet.especie,
          raca: pet.raca,
          sexo: pet.sexo,
          observacao: pet.observacao || pet.observacoesPet,
        })),
      };

      // console.log("dadosCliente:", dadosCliente); // Debugging dadosCliente

      if (clienteParaEditar) {
        // console.log("clienteParaEditar:", clienteParaEditar); // Verificando o cliente para editar
        // console.log("ID do cliente:", clienteParaEditar.id); // Verificando ID do cliente

        const response = await axios.put(
          `https://petsystem-backend.onrender.com/clientes/${clienteParaEditar.id}`,
          dadosCliente,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log("Resposta da atualização:", response.data);
      } else {
        const response = await axios.post(
          "https://petsystem-backend.onrender.com/clientes",
          dadosCliente,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Resposta da criação:", response.data);
      }

      onAtualizarCliete();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert(error.response?.data?.error || "Erro ao salvar cliente");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>{clienteParaEditar ? "Editar Cliente" : "Adicionar Cliente"}</h2>
          <button className="btn-fechar" onClick={onClose}>
            <SquareX size={24} />
          </button>
        </div>

        <form className="form-cliente" onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
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
                  <Pencil size={16} />
                  Editar pet
                </button>
                <button
                  type="button"
                  className="button-sm button"
                  onClick={abrirPopupAdicionar}
                >
                  <CirclePlus size={16} />
                  Adicionar pet
                </button>
              </div>
            </div>

            <div className="lista-pets-relacionados">
              {pets.length > 0 ? (
                pets.map((pet, index) => (
                  <CardPet
                    key={index}
                    nome={pet.pet_nome || pet.nomePet}
                    onRemover={() => removerPet(index)}
                  />
                ))
              ) : (
                <p>Nenhum pet adicionado</p>
              )}
            </div>
          </div>

          <button type="submit" className="button-md button">
            {clienteParaEditar ? "Salvar Alterações" : "Salvar"}
          </button>
        </form>
      </div>

      {popupAberto === "adicionarPet" && (
        <AdicionarPet onClose={fecharPopup} onSalvar={adicionarNovoPet} />
      )}
    </div>
  );
}

export default AdicionarCliente;
