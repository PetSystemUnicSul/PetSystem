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

  return (
    <div className="cardAgendamento" onClick={onClick}>
      <div className="servicoEStatus">
        <h4>{servico}</h4>
        <span className="statusSpan">
          agendado
        </span>
      </div>
      <div className="dadosAgendamento">
        <div className="infosAgendametos">
          <User strokeWidth={3} size={15} className="iconAgendamento"/>
          <p>
            <span>Nome:</span>
            {clienteNome}
          </p>
        </div>
        <div className="infosAgendametos">
          <Calendar strokeWidth={3} size={15} className="iconAgendamento"/>
          <p>
            <span>Data:</span>
            {data}
          </p>
        </div>
        <div className="infosAgendametos">
          <Clock strokeWidth={3}size={15} className="iconAgendamento"/>
          <p>
            <span>Hora:</span>
            {horario}
          </p>
        </div>
        <div className="infosAgendametos">
          <PawPrint strokeWidth={3} size={15} className="iconAgendamento"/>
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
