import { Link } from "react-router-dom";
import "../styles/home.css";

function BotaoPagamento() {
     return (
        <button className="btn-plano">
          <Link to="/cadastro"><div className="header-btn">Assinar</div></Link>
        </button>
      );
}

export default BotaoPagamento;