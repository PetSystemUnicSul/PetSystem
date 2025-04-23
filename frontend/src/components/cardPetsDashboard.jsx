import "../styles/cardAgendamentoDashboard.css";
import { Info, PawPrint } from "lucide-react";

function CardPetDashboard({ dadoPet, onClick }) {
  return (
    <div className="cardDashboard">
    <div className="groupInfosBtn">
      <div className="dadosCards">
        <div className="infosCards">
          <PawPrint strokeWidth={3} size={15} className="iconsCards"/>
          <p>
            <span>Pet:</span>
            {dadoPet.pet_nome}
          </p>
        </div>
        <div className="infosCards">
          <PawPrint strokeWidth={3} size={15} className="iconsCards"/>
          <p>
            <span>Especie:</span>
            {dadoPet.especie}
          </p>
        </div>
        <div className="infosCards">
          <PawPrint strokeWidth={3} size={15} className="iconsCards"/>
          <p>
            <span>Raça:</span>
            {dadoPet.raca}
          </p>
        </div>
        <div className="infosCards">
         <PawPrint strokeWidth={3} size={15} className="iconsCards"/>
          <p>
            <span>Sexo:</span>
            {dadoPet.sexo}
          </p>
        </div>
      </div>
      <div className="btns-info-edit">
        <button className="btn-info" onClick={onClick}>
          <Info strokeWidth={3} size={20} />
        </button>
      </div>
    </div>
  </div>
  );
}

export default CardPetDashboard; // Changed name to match file purpose