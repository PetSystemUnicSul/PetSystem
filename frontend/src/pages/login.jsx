import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/loginEcadastro.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function logar(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

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

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
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

                <button className="button buttonLogin" type="submit" disabled={loading}> {loading ? <span className="loader"></span> : "Entrar"}</button>

                <p><a href="/esqueci-senha" className="links">Esqueci minha senha</a></p>

                <p>Não tem conta? <Link to="/cadastro" className='links'>Criar nova conta</Link></p>
            </form>
        </div>
    );
}

export default Login;
