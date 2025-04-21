import { useState, useEffect } from "react";
import { SquareX } from "lucide-react";
import axios from "axios";
import "../styles/adicionarCliente.css";

function AdicionarAgendamento({ onClose, onAtualizarAgendamentos }) {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    clienteId: "",
    petId: "",
    data: "",
    horario: "",
    servico: "",
  });

  // Buscar clientes ao carregar o componente
  useEffect(() => {
    async function buscarClientes() {
      try {
        const response = await axios.get("https://petsystem-backend.onrender.com/clientes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        alert("Erro ao buscar clientes");
      }
    }

    buscarClientes();
  }, []);

  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      clienteId,
      petId: "", // Zera o pet se cliente for alterado
      data: "",
      horario: "",
      servico: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const dadosAgendamento = {
        clienteId: formData.clienteId,
        petId: formData.petId,
        data: formData.data,
        horario: formData.horario,
        servico: formData.servico,
      };

      const response = await axios.post(
        "https://petsystem-backend.onrender.com/agendamentos",
        dadosAgendamento,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      alert("Agendamento salvo com sucesso!");

      // Chama a função para atualizar os agendamentos no componente pai
      onAtualizarAgendamentos();

      onClose(); // Fecha o popup após salvar
    } catch (error) {
      console.log("ERRO AQUI");
      console.error("Erro ao salvar agendamento:", error.response?.data || error.message);
      alert("Erro ao salvar agendamento. Verifique os dados e tente novamente.");
    }
  };

  const clienteSelecionado = clientes.find((c) => c.id === formData.clienteId);
  const petSelecionado = clienteSelecionado?.pets.find((pet) => pet._id === formData.petId);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Adicionar Agendamento</h2>
          <button className="btn-fechar" onClick={onClose}>
            <SquareX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-agendamento">
          <div>
            <label>Cliente:</label>
            <select
              name="clienteId"
              value={formData.clienteId}
              onChange={handleClienteChange}
              required
            >
              <option value="" hidden>Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.tutor}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Pet:</label>
            <select
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              required
              disabled={!formData.clienteId} // Desabilita até um cliente ser selecionado
            >
              <option value="" hidden>Selecione um pet</option>
              {clienteSelecionado?.pets.map((pet) => (
                <option key={pet._id} value={pet._id}>
                  {pet.pet_nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              disabled={!formData.petId} // Desabilita até um pet ser selecionado
            />
          </div>

          <div>
            <label>Horário:</label>
            <input
              type="time"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
              disabled={!formData.data} // Desabilita até uma data ser selecionada
            />
          </div>

          <div>
            <label>Serviço:</label>
            <select
              name="servico"
              value={formData.servico}
              onChange={handleChange}
              required
              disabled={!formData.petId} // Desabilita até um pet ser selecionado
            >
              <option value="" hidden>Selecione um serviço</option>
              <option value="Banho - R$50,00">Banho - R$50,00</option>
              <option value="Tosa - R$70,00">Tosa - R$70,00</option>
              <option value="Consulta - R$100,00">Consulta - R$100,00</option>
            </select>
          </div>

          <button type="submit" className="button-md button">
            Salvar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdicionarAgendamento;
