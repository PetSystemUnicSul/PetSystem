import { Link } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Cadastro() {
    return(
        <div className='divLoginCadastro'>
            <form>
                <h1 className='form-title'>Cadastro</h1>

                <label>Nome:</label>
                <input type="text" name="nome" id="nome" />

                <label>Email:</label>
                <input type="email" />

                <label>CPF:</label>
                <input type="text" name="cpf" id="cpf" />

                <label>Senha:</label>
                <input type="password" name="senha" id="senha" />

                <label>Confirmar senha:</label>
                <input type="password" />

                <button className="buttonLoginCadastro" type="submit">Cadastrar</button>

                <p>Já tem uma conta? <Link to="/login" className='link-create-account'>Entrar</Link></p>

            </form>
        </div>
    )
}

export default Cadastro;