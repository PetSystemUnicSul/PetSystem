import { Link, useNavigate } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Cadastro() {
    const naviguete = useNavigate();

     async function cadastrar() {
        naviguete('/dashboard');
     }

    return(
        <div className='divLoginCadastro'>
            <form>
                <h1 className='form-title'>Cadastro</h1>

                <label>Nome:</label>
                <input type="text" name="nome" id="nome" />

                <label>Email:</label>
                <input type="email" />

                <label>CPF/CNPJ:</label>
                <input type="text" name="cpfCnpj" id="cpfCnpj" />

                <label>Senha:</label>
                <input type="password" name="senha" id="senha" />

                <label>Confirmar senha:</label>
                <input type="password" />

                <button className="buttonCadastro" onClick={cadastrar}>Cadastrar</button>

                <p>Já tem uma conta? <Link to="/login" className='links'>Entrar</Link></p>

            </form>
        </div>
    )
}

export default Cadastro;