import "../styles/cardAgendamentoDashboard.css";
import { Pen, Info, User, PawPrint, Phone, MapPin } from "lucide-react";

function CardClienteDashboard({ onClick, dadoCliente }) {
  return (
    <div className="cardDashboard">
      <div className="groupInfosBtn">
        <div className="dadosCards">
          <div className="infosCards">
              <User strokeWidth={3} size={15} className="iconsCards"/>
            <p>
              <span>Nome:</span>
              {dadoCliente.tutor}
            </p>
          </div>
          <div className="infosCards">
            <PawPrint strokeWidth={3} size={15} className="iconsCards"/>
            <p>
              <span>Pets:</span>
              {dadoCliente.pets.map((p) => p.pet_nome).join(", ")}
            </p>
          </div>
          <div className="infosCards">
            <Phone strokeWidth={3} size={15} className="iconsCards"/>
            <p>
              <span>Telefone:</span>
              {dadoCliente.telefone}
            </p>
          </div>
          <div className="infosCards">
            <MapPin strokeWidth={3} size={15} className="iconsCards"/>
            <p>
              <span>Endereço:</span>
              {dadoCliente.endereco}
            </p>
          </div>
        </div>
        <div className="btns-info-edit">
          <button className="btn-info" onClick={onClick}>
            <Info strokeWidth={3} size={20} />
          </button>
          <button className="btn-edit">
            <Pen strokeWidth={3} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardClienteDashboard;
