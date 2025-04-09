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

                <button className="buttonLoginCadastro" type="submit">Entrar</button>

                <p><a href="" className="links">Esqueci minha senha.</a></p>
                <p><Link to="/dashboard" className='links'>Ir para o dashboard</Link></p>

                <p>Não tem conta? <Link to="/cadastro" className='links'>Criar nova conta.</Link></p>
            </form>
        </div>
    )
}

export default Login;