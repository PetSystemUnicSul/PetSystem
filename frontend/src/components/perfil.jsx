import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clienteDashboard.css";
import "../styles/perfil.css";
import axios from "axios";

function Perfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    nome_fantasia: "",
    cnpj: ""
  });

  // Carrega os dados do localStorage ao abrir o componente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setPerfil({
        nome: user.nome || "",
        email: user.email || "",
        nome_fantasia: user.nome_fantasia || "",
        cnpj: user.cnpj || ""
      });
    }
  }, []);

  function deslogar() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  async function excluirConta() {
    try {
      const response = await axios.delete(`https://petsystem-backend.onrender.com/perfil`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      deslogar();
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao excluir conta. Tente novamente.");
    }
  }

  return (
    <main className="mainDashboard">
      <div className="divPerfil">
        <h1>Seu Perfil</h1>
            <form>
                <label htmlFor="nome">Seu nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={perfil.nome}
                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                />

                <label htmlFor="email">Seu email:</label>
                <input
                    type="email"
                    id="email"
                    value={perfil.email}
                    onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                />

                <label htmlFor="nome-fantasia">Seu nome fantasia:</label>
                <input
                    type="text"
                    id="nome-fantasia"
                    value={perfil.nome_fantasia}
                    onChange={(e) => setPerfil({ ...perfil, nome_fantasia: e.target.value })}
                />

                <label htmlFor="cnpj">Seu CNPJ:</label>
                <input
                    type="text"
                    id="cnpj"
                    value={perfil.cnpj}
                    onChange={(e) => setPerfil({ ...perfil, cnpj: e.target.value })}
                />

                <button className="button button-md" type="button">
                    Salvar alterações
                </button>
            </form>

        <button className="button button-md" onClick={deslogar}>Deslogar</button>
        <button className="danger-button danger-btn" onClick={excluirConta}>Excluir conta</button>
      </div>
    </main>
  );
}

export default Perfil;
