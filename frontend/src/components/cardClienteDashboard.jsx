import "../styles/cardClienteDashboard.css";
import { Pen } from "lucide-react";

function CardClienteDashboard( {onClick,  dadoCliente } ) {
  return (
    <>
      <div className="card">
          <div className="dadosClienteGroup">
          <div>
          <p>nome: </p><p>{dadoCliente.tutor}</p>
          </div>
          <p>{dadoCliente.pets.join(", ")}</p>
          <p>{dadoCliente.telefone}</p>
          <p>{dadoCliente.endereco}</p>
          </div>
          <button className="btnEditar" onClick={onClick}><Pen size={15} /></button>
      </div>
    </>
  );
}

export default CardClienteDashboard;