import { Link, useNavigate } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Login() {
    const naviguete = useNavigate();

     async function logar() {
        naviguete('/dashboard');
     }

    return(
        <div className='divLoginCadastro'>
            <form className="formularioLogin">
                <h1 className='form-title'>Login</h1>
                <label>Email:</label>
                <input type="email" />

                <label>Senha:</label>
                <input type="password" name="senha" id="senha" />

                <button className="buttonLogin" onClick={logar}>Entrar</button>

                <p><a href="" className="links">Esqueci minha senha</a></p>

                <p>Não tem conta? <Link to="/cadastro" className='links'>Criar nova conta</Link></p>
            </form>
        </div>
    )
}

export default Login;