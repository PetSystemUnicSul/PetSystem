import "../styles/cardClienteDashboard.css";
import { Pen, Info } from "lucide-react";

function CardClienteDashboard({ onClick, dadoCliente }) {
  return (
      <div className="card">
        <div className="dadosGroup">
          <div className="labelDados">
            <p>Nome:</p>
            <p>{dadoCliente.tutor}</p>
          </div>

          <div className="labelDados">
            <p>Pets:</p>
            <p>{dadoCliente.pets.join(", ")}</p>
          </div>

          <div className="labelDados">
            <p>Numero:</p>
            <p>{dadoCliente.telefone}</p>
          </div>

          <div className="labelDados">
            <p>Endereço:</p>
            <p>{dadoCliente.endereco}</p>
          </div>
        </div>
        <div className="btns-info-edit">
        <button className="btnInfo" onClick={onClick}><Info strokeWidth={3} size={20}/></button>
        <button className="btnEditar" ><Pen strokeWidth={3} size={20}/></button>
        </div>
      </div>
  );
}

export default CardClienteDashboard;
