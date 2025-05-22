import "../styles/cardAgendamentoDashboard.css";
import { Info, User, Calendar, Clock, PawPrint } from "lucide-react";

function CardAgendamentoDashboard({ dadosAgendamento, onClick }) {
  const {
    servico = "Não informado",
    data = "Não informada",
    horario = "Não informado",
    petId,
    clienteId,
  } = dadosAgendamento || {};

  const petNome = petId?.pet_nome || "Desconhecido";
  const clienteNome = clienteId?.cliente_nome || "Desconhecido";
  
  const formatarDataBrasileira = (dataString) => {
    if (typeof dataString === 'string' && dataString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [ano, mes, dia] = dataString.split('-');
      return `${dia}/${mes}/${ano}`;
    }
    
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  
  const dataBR = formatarDataBrasileira(data);

  return (
    <div className="cardDashboard" onClick={onClick}>
      <div className="servicoEStatus">
        <h4>{servico}</h4>
        <span
          className="statusSpan"
          style={{
            backgroundColor: 
              dadosAgendamento.status === "Concluído" ? "#4CAF50" : 
              dadosAgendamento.status === "Cancelado" ? "#F44336" : 
              "#FF9800"
          }}
        >
          {dadosAgendamento.status || "Agendado"}
        </span>
      </div>
      <div className="dadosCards">
        <div className="infosCards">
          <User strokeWidth={3} size={15} className="iconsCards" />
          <p>
            <span>Nome:</span>
            {clienteNome}
          </p>
        </div>
        <div className="infosCards">
          <Calendar strokeWidth={3} size={15} className="iconsCards" />
          <p>
            <span>Data:</span>
            {dataBR}
          </p>
        </div>
        <div className="infosCards">
          <Clock strokeWidth={3} size={15} className="iconsCards" />
          <p>
            <span>Hora:</span>
            {horario}
          </p>
        </div>
        <div className="infosCards">
          <PawPrint strokeWidth={3} size={15} className="iconsCards" />
          <p>
            <span>Pet:</span>
            {petNome}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardAgendamentoDashboard;