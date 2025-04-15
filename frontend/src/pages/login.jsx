import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

     async function logar(e) {
        e.preventDefault();
        setError("");
        
        try {
            const response = await fetch('https://petsystem-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Erro ao fazer login');
            }
            
            // Armazenar token e dados do usuário no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirecionar para o dashboard
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
     }

    return(
        <div className='divLoginCadastro'>
            <form className="formularioLogin" onSubmit={logar}>
                <h1 className='form-title'>Login</h1>
                
                {error && <p className="error-message">{error}</p>}
                
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha:</label>
                <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button className="button buttonLogin" type="submit">Entrar</button>

                <p><a href="/esqueci-senha" className="links">Esqueci minha senha</a></p>

                <p>Não tem conta? <Link to="/cadastro" className='links'>Criar nova conta</Link></p>
            </form>
        </div>
    )
}

export default Login;
