import "../styles/cardClienteDashboard.css";
import { Pen } from "lucide-react";

function CardClienteDashboard() {
  return (
    <div className="card">
      <div className="name"><p>Lucas Fernandes</p></div>
      <div className="pets"><p>Pipow, Pelucia</p></div>
      <div className="telefone"><p>(11) 988377-710</p></div>
      <div className="endereço"><p>Rua exemplo de Deus, 453</p></div>
      <button className="btnEditar"><Pen size={15}/></button>
    </div>
  );
}

export default CardClienteDashboard;