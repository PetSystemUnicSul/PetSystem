import { useState } from "react";
import "../styles/barraLateral.css";
import logo from "../assets/images/logo.png";



function BarraLateral() {
    const [activeButton, setActiveButton] = useState('btn1');

    const buttonStyle = (btn) =>
        activeButton === btn ? 'buttonAtivo' : 'buttonInativo';

    return (
        <nav className="barraLateralNav">
            <div>
                <img src={logo} alt="Logo" />
            </div>
            <div className="groupButtonNav">
                <button
                    className={buttonStyle('btn1')}
                    onClick={() => setActiveButton('btn1')}
                >
                    <span>O</span><p>Agenda</p>
                </button>
                <button
                    className={buttonStyle('btn2')}
                    onClick={() => setActiveButton('btn2')}
                >
                    <span>X</span><p>Clientes</p>
                </button>
            </div>
        </nav>
    );
}

export default BarraLateral;
