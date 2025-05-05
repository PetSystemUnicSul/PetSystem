import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/loginEcadastro.css';

function Cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        nome_fantasia: '',
        cnpj: '',
        senha: '',
        confirmarSenha: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatCNPJ = (value) => {
        const nums = value.replace(/\D/g, '');
        if (nums.length <= 2) return nums;
        if (nums.length <= 5) return `${nums.slice(0, 2)}.${nums.slice(2)}`;
        if (nums.length <= 8) return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5)}`;
        if (nums.length <= 12) return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8)}`;
        return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8, 12)}-${nums.slice(12, 14)}`;
    };

    const handleCNPJChange = (e) => {
        const formattedValue = formatCNPJ(e.target.value);
        handleChange({
            target: {
                name: 'cnpj',
                value: formattedValue
            }
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.nome_fantasia) newErrors.nome_fantasia = 'Nome fantasia é obrigatório';
        if (!formData.cnpj || formData.cnpj.replace(/\D/g, '').length !== 14) {
            newErrors.cnpj = 'CNPJ inválido';
        }
        if (!formData.senha || formData.senha.length < 6) {
            newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        }
        if (formData.senha !== formData.confirmarSenha) {
            newErrors.confirmarSenha = 'Senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const payload = {
                nome: formData.nome,
                email: formData.email,
                nome_fantasia: formData.nome_fantasia,
                cnpj: formData.cnpj.replace(/\D/g, ''),
                senha: formData.senha
            };

            const res = await axios.post('https://petsystem-backend.onrender.com/cadastro', payload);
            
            if (res.status === 201) {
                handlePayment();
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert(error.response?.data?.error || 'Erro ao cadastrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
          const res = await axios.post('https://petsystem-backend.onrender.com/pagamento');
          const { init_point } = res.data;
    
          window.location.href = init_point;
        } catch (err) {
          console.error('Erro ao iniciar pagamento:', err);
        }
      };

    return (
        <div className='divLoginCadastro'>
            <form className="formularioCadastro" onSubmit={handleSubmit}>
                <h1 className='form-title'>Cadastro</h1>

                <label htmlFor="nome">Nome:</label>
                <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    placeholder="Digite seu nome..." 
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
                {errors.nome && <span className="error-message">{errors.nome}</span>}

                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Digite seu Email..." 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}

                <label htmlFor="nome_fantasia">Nome fantasia:</label>
                <input 
                    type="text" 
                    name="nome_fantasia" 
                    id="nome_fantasia" 
                    placeholder="Digite o nome do seu Petshop..." 
                    value={formData.nome_fantasia}
                    onChange={handleChange}
                    required
                />
                {errors.nome_fantasia && <span className="error-message">{errors.nome_fantasia}</span>}

                <label htmlFor="cnpj">CNPJ:</label>
                <input 
                    type="text" 
                    name="cnpj" 
                    id="cnpj" 
                    placeholder="00.000.000/0000-00" 
                    value={formData.cnpj}
                    onChange={handleCNPJChange}
                    required
                />
                {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}

                <label htmlFor="senha">Senha:</label>
                <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    placeholder="Crie uma senha..." 
                    value={formData.senha}
                    onChange={handleChange}
                    required
                />
                {errors.senha && <span className="error-message">{errors.senha}</span>}

                <label htmlFor="confirmarSenha">Confirmar senha:</label>
                <input 
                    type="password" 
                    name="confirmarSenha" 
                    id="confirmarSenha" 
                    placeholder="Confirme sua senha..." 
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                />
                {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}

                <button 
                    type="submit" 
                    className="button buttonCadastro"
                    disabled={loading}
                >
                    {loading ? <span className="loader"></span> : "Cadastrar"}
                </button>

                <p>Já tem uma conta? <Link to="/login" className='links'>Entrar</Link></p>
            </form>
        </div>
    );
}

export default Cadastro;
