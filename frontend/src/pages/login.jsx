import { Link } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Login() {
    return(
        <div className='divLoginCadastro'>
            <form>
                <h1 className='form-title'>Login</h1>
                <label>Email:</label>
                <input type="email" />

                <label>Senha:</label>
                <input type="password" name="senha" id="senha" />

                <Link to="/dashboard" className="linkDeNavegação"><button className="buttonLoginCadastro">Entrar</button></Link>

                <p><a href="" className="links">Esqueci minha senha.</a></p>

                <p>Não tem conta? <Link to="/cadastro" className='links'>Criar nova conta.</Link></p>
            </form>
        </div>
    )
}

export default Login;