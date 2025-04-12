import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/loginEcadastro.css';

function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [documento, setDocumento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    async function cadastrar(e) {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            await api.post('/api/petshop', {
                nome,
                email,
                documento: documento.replace(/\D/g, ''), // remove pontos, traços e barras
                password: senha
            });

            alert('Cadastro realizado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao cadastrar:', error.response?.data || error.message);
            alert('Erro ao cadastrar. Verifique os dados.');
        }
    }

    return(
        <div className='divLoginCadastro'>
            <form className="formularioCadastro" onSubmit={cadastrar}>
                <h1 className='form-title'>Cadastro</h1>

                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label>CPF/CNPJ:</label>
                <input
                    type="text"
                    value={documento}
                    onChange={e => setDocumento(e.target.value)}
                />

                <label>Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />

                <label>Confirmar senha:</label>
                <input
                    type="password"
                    value={confirmarSenha}
                    onChange={e => setConfirmarSenha(e.target.value)}
                />

                <button className="button buttonCadastro" type="submit">Cadastrar</button>

                <p>Já tem uma conta? <Link to="/login" className='links'>Entrar</Link></p>
            </form>
        </div>
    );
}

export default Cadastro;