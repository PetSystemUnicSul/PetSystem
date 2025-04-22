import "../styles/cardClienteDashboard.css";
import { Info } from "lucide-react";

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
    <div className="card" onClick={onClick}>
      <div className="dadosGroup">
        <div className="labelDados">
          <p>Serviço:</p>
          <p>{servico}</p>
        </div>

        <div className="labelDados">
          <p>Data:</p>
          <p>{data}</p>
        </div>

        <div className="labelDados">
          <p>Horário:</p>
          <p>{horario}</p>
        </div>

        <div className="labelDados">
          <p>Pet:</p>
          <p>{petNome}</p>
        </div>

        <div className="labelDados">
          <p>Tutor:</p>
          <p>{clienteNome}</p>
        </div>
      </div>

      <div className="btns-info-edit">
        <button className="btnInfo">
          <Info strokeWidth={3} size={20} />
        </button>
      </div>
    </div>
  );
}

export default CardAgendamentoDashboard;
