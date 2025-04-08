import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
      <Link to="/"><img src={logo} /></Link>
      </div>
      <div className="header-buttons">
        <Link to="/login"><div className="header-btn">Login</div></Link>
        <Link to="/cadastro"><div className="header-btn">Cadastrar</div></Link>
      </div>
    </header>
  );
}

export default Header;
