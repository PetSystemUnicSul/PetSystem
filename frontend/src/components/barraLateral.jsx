import { Calendar, User, PawPrint } from "lucide-react";
import "../styles/barraLateral.css";
import logo from "../assets/images/Logo.png";

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
          <p className="nomeAba">Agenda</p>
        </button>
        <button
          className={buttonStyle('clientes')}
          onClick={() => setActiveButton('clientes')}
        >
          <User size={35} />
          <p className="nomeAba">Clientes</p>
        </button>
        <button
          className={buttonStyle('pets')}
          onClick={() => setActiveButton('pets')}
        >
          <PawPrint size={35} />
          <p className="nomeAba">Pets</p>
        </button>
      </div>
    </nav>
  );
}

export default BarraLateral;
