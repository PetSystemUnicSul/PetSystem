import { Link, useNavigate } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Cadastro() {
    const navigate = useNavigate();

     async function cadastrar() {
        navigate('/login');
     }

    return(
        <div className='divLoginCadastro'>
            <form className="formularioCadastro">
                <h1 className='form-title'>Cadastro</h1>

                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome" placeholder="Digite seu nome..."/>

                <label for="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Digite seu Email..." required/>

                <label for="Nomefantasia">Nome fantasia:</label>
                <input type="text" name="Nomefantasia" id="Nomefantasia" placeholder="Digite o nome do seu Petshop..." required/>

                <label for="cnpj" >CNPJ:</label>
                <input type="text" name="cnpj" id="cnpj" placeholder="00.000.000/0000-00" required/>

                <label for="senha" >Senha:</label>
                <input type="password" name="senha" id="senha" placeholder="Crie uma senha..." required/>

                <label>Confirmar senha:</label>
                <input type="password" placeholder="Confirme sua senha... " required/>

                <button type="submit" className="button buttonCadastro" onClick={cadastrar}>Cadastrar</button>

                <p>Já tem uma conta? <a className='links' onClick={cadastrar()}>Entrar</a></p>

            </form>
        </div>
    )
}

export default Cadastro;