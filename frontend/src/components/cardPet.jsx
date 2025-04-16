import React from "react";
import { Trash2 } from "lucide-react";
import "../styles/cardPet.css";

function CardPet({ nome, onRemover }) {
  return (
    <div className="pet-card">
      <p>{nome}</p>
      <button className="btn-remover-pet" onClick={onRemover} type="button">
        <Trash2 size={16} className="icon-remover-pet danger-button" />
      </button>
    </div>
  );
}

export default CardPet;
