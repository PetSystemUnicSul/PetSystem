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
    <div className="cardDashboard" onClick={onClick}>
      <div className="servicoEStatus">
        <h4>{servico}</h4>
        <span className="statusSpan">
          agendado
        </span>
      </div>
      <div className="dadosCards">
        <div className="infosCards">
          <User strokeWidth={3} size={15} className="iconsCards"/>
          <p>
            <span>Nome:</span>
            {clienteNome}
          </p>
        </div>
        <div className="infosCards">
          <Calendar strokeWidth={3} size={15} className="iconsCards"/>
          <p>
            <span>Data:</span>
            {data}
          </p>
        </div>
        <div className="infosCards">
          <Clock strokeWidth={3}size={15} className="iconsCards"/>
          <p>
            <span>Hora:</span>
            {horario}
          </p>
        </div>
        <div className="infosCards">
          <PawPrint strokeWidth={3} size={15} className="iconsCards"/>
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
