import { Link } from "react-router-dom";

function BotaoPagamento() {
     return (
        <button className="btn-plano">
          <Link to="/cadastro"><div className="header-btn">Comprar</div></Link>
        </button>
      );
}

export default BotaoPagamento;