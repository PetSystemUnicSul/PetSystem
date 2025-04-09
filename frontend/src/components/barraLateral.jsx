import { useState } from "react";
import "../styles/barraLateral.css";
import logo from "../assets/images/logo.png";
import { Calendar, User } from "lucide-react"




function BarraLateral() {
    const [activeButton, setActiveButton] = useState('btn1');

    const buttonStyle = (btn) =>
        activeButton === btn ? 'buttonAtivo' : 'buttonInativo';

    return (
        <nav className="barraLateralNav">
            <div className="divImagem">
                <img src={logo} alt="Logo" />
            </div>
            <div className="groupButtonNav">
                <button className={buttonStyle('btn1')} onClick={() => setActiveButton('btn1')}>
                    <Calendar />
                    <p>Agenda</p>
                </button>
                <button className={buttonStyle('btn2')} onClick={() => setActiveButton('btn2')}>
                    <User />
                    <p>Clientes</p>
                </button>
            </div>
        </nav>
    );
}

export default BarraLateral;
