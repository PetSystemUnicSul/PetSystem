import { useState, useEffect } from "react";
import { SquareX } from "lucide-react";
import axios from "axios";
import "../styles/adicionarCliente.css";

function AdicionarAgendamento({ onClose, onAtualizarAgendamentos, agendamentoParaEditar }) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: "",
    petId: "",
    data: "",
    horario: "",
    servico: "",
  });

  const isEditMode = !!agendamentoParaEditar;

  useEffect(() => {
    async function buscarClientes() {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    buscarClientes();

    if (agendamentoParaEditar) {
      const dataFormatada = formatarDataParaInput(agendamentoParaEditar.data);
      
      setFormData({
        clienteId: agendamentoParaEditar.clienteId?._id || agendamentoParaEditar.clienteId,
        petId: agendamentoParaEditar.petId?._id || agendamentoParaEditar.petId,
        data: dataFormatada,
        horario: agendamentoParaEditar.horario,
        servico: agendamentoParaEditar.servico,
      });
    }
  }, [agendamentoParaEditar]);

  const formatarDataParaInput = (dataISO) => {
    const data = new Date(dataISO);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      clienteId,
      petId: "", 
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    const { clienteId, petId, data, horario, servico } = formData;
    
    if (!clienteId || !petId || !data || !horario || !servico) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    if (!isEditMode) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataAgendamento = new Date(data);
      
      if (dataAgendamento < hoje) {
        alert("Não é possível agendar para uma data anterior a hoje.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const dadosAgendamento = {
        clienteId: formData.clienteId,
        petId: formData.petId,
        data: formData.data,
        horario: formData.horario,
        servico: formData.servico,
      };

      const url = isEditMode
        ? `https://petsystem-backend.onrender.com/agendamentos/${agendamentoParaEditar._id}`
        : "https://petsystem-backend.onrender.com/agendamentos";

      const method = isEditMode ? "PUT" : "POST";

      await axios({
        method,
        url,
        data: dadosAgendamento,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      onAtualizarAgendamentos();
      onClose(); 
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error.response?.data || error.message);
      alert(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} agendamento. Verifique os dados e tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  const clienteSelecionado = clientes.find((c) => c.id === formData.clienteId);
  const petsDisponiveis = clienteSelecionado?.pets || [];

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>{isEditMode ? 'Editar Agendamento' : 'Adicionar Agendamento'}</h2>
          <button className="btn-fechar" onClick={onClose} disabled={loading}>
            <SquareX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-agendamento">
          <div>
            <label>Cliente: *</label>
            <select
              name="clienteId"
              value={formData.clienteId}
              onChange={handleClienteChange}
              required
              disabled={loading}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.tutor}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Pet: *</label>
            <select
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              required
              disabled={!formData.clienteId || loading}
            >
              <option value="">
                {!formData.clienteId ? 'Selecione um cliente primeiro' : 'Selecione um pet'}
              </option>
              {petsDisponiveis.map((pet) => (
                <option key={pet._id} value={pet._id}>
                  {pet.pet_nome} ({pet.especie})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Data: *</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              disabled={loading}
              min={isEditMode ? undefined : new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label>Horário: *</label>
            <input
              type="time"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label>Serviço: *</label>
            <select
              name="servico"
              value={formData.servico}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecione um serviço</option>
              <option value="Banho - R$50,00">Banho - R$50,00</option>
              <option value="Tosa - R$70,00">Tosa - R$70,00</option>
              <option value="Consulta - R$100,00">Consulta - R$100,00</option>
              <option value="Banho e Tosa - R$110,00">Banho e Tosa - R$110,00</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="button-md button"
              disabled={loading}
            >
              {loading ? 'Salvando...' : (isEditMode ? 'Atualizar Agendamento' : 'Salvar Agendamento')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdicionarAgendamento;