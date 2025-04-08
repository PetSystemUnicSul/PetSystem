import '../styles/login.css';

function Login() {
    return(
        <div>
            <form>
                <h1 className='form-title'>Login</h1>
                <label>Email:</label>
                <input type="email" />

                <label>Senha:</label>
                <input type="password" name="senha" id="senha" />

                <button type="submit">Entrar</button>

                <p><a href="">Esqueci minha senha.</a></p>

                <p>Não tem conta? <a href="" className='link-create-account'>Criar nova conta.</a></p>
            </form>
        </div>
    )
}

export default Login;