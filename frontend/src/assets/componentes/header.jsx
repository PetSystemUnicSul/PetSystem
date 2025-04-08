import React from "react";
import "../styles/header.css";
import logo from "../images/Logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="header-buttons">
        <div className="header-btn">Login</div>
        <div className="header-btn">Cadastrar</div>
      </div>
    </header>
  );
}

export default Header;