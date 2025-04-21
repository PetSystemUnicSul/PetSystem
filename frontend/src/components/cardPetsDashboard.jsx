import "../styles/cardClienteDashboard.css";
import { Info } from "lucide-react";

function CardPetDashboard({ dadoPet, onClick }) {
  return (
      <div className="card" onClick={onClick}>
        <div className="dadosGroup">
          <div className="labelDados">
            <p>Pet:</p>
            <p>{dadoPet.pet_nome}</p>
          </div>

          <div className="labelDados">
            <p>Especie:</p>
            <p>{dadoPet.especie}</p> {/* Fixed typo: "epecie" to "especie" */}
          </div>

          <div className="labelDados">
            <p>Raça:</p>
            <p>{dadoPet.raca}</p>
          </div>

          <div className="labelDados">
            <p>Sexo:</p>
            <p>{dadoPet.sexo}</p>
          </div>
        </div>
        <div className="btns-info-edit">
          <button className="btnInfo"><Info strokeWidth={3} size={20}/></button>
        </div>
      </div>
  );
}

export default CardPetDashboard; // Changed name to match file purpose