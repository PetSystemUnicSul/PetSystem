import { Calendar, User } from "lucide-react";
import "../styles/barraLateral.css";
import logo from "../assets/images/logo.png";

function BarraLateral({ activeButton, setActiveButton }) {
  const buttonStyle = (btn) =>
    activeButton === btn ? 'buttonAtivo' : 'buttonInativo';

  return (
    <nav className="barraLateralNav">
      <div className="divImagem">
        <img src={logo} alt="Logo" />
      </div>
      <div className="groupButtonNav">
        <button
          className={buttonStyle('agenda')}
          onClick={() => setActiveButton('agenda')}
        >
          <Calendar size={35} />
          <p>Agenda</p>
        </button>
        <button
          className={buttonStyle('clientes')}
          onClick={() => setActiveButton('clientes')}
        >
          <User size={35} />
          <p>Clientes</p>
        </button>
      </div>
    </nav>
  );
}

export default BarraLateral;
