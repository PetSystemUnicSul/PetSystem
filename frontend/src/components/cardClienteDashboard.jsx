import "../styles/cardClienteDashboard.css";
import { Pen } from "lucide-react"

function CardClienteDashboard() {
  return (
    <div className="card">
      <div className="name"><p>Lucas Fernandes</p></div>

      <div className="pets"><p>Lucas Fernandes</p></div>

      <div className="telefone"><p>Lucas Fernandes</p></div>

      <div className="endereço"><p>Lucas Fernandes</p></div>

      <button className="btnEditar"><Pen size={15}/></button>
    </div>
  );
}

export default CardClienteDashboard;
