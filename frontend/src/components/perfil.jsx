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

  const [mensagem, setMensagem] = useState({
    texto: "",
    tipo: "" // "sucesso" ou "erro"
  });

  const [cepErro, setCepErro] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setPerfil({
        nome: user.nome || "",
        email: user.email || "",
        nome_fantasia: user.nome_fantasia || "",
        cnpj: user.cnpj || "",
        endereco: user.endereco || "",
        cep: user.cep || "",
        telefone: user.telefone || "",
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
      setMensagem({ texto: "Erro ao excluir conta. Tente novamente.", tipo: "erro" });
    }
  }

  async function updatePerfil() {
    // Limpar mensagens anteriores
    setMensagem({ texto: "", tipo: "" });
    setCepErro("");
    
    if (perfil.cep && perfil.cep.trim() !== "") {
      const cepLimpo = perfil.cep.replace(/\D/g, "");
      
      if (cepLimpo.length !== 8) {
        setCepErro("CEP inválido. Deve conter 8 dígitos.");
        return;
      }
      
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        if (response.data.erro) {
          setCepErro("CEP não encontrado.");
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar CEP:", error);
        setCepErro("Erro ao verificar CEP. Tente novamente.");
        return;
      }
    }
    
    try {
      const response = await axios.put("https://petsystem-backend.onrender.com/perfil", perfil, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      const updated = response.data;
      
      localStorage.setItem("user", JSON.stringify(updated));
      
      setPerfil({
        nome: updated.nome || "",
        email: updated.email || "",
        nome_fantasia: updated.nome_fantasia || "",
        cnpj: updated.cnpj || "",
        endereco: updated.endereco || "",
        cep: updated.cep || "",
        telefone: updated.telefone || "",
      });
  
      setMensagem({ texto: "Perfil atualizado com sucesso!", tipo: "sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setMensagem({ texto: "Erro ao atualizar perfil. Tente novamente.", tipo: "erro" });
    }
  }

  return (
    <main className="mainDashboard mainPerfil">
      <div className="divPerfil">
          <h1>Seu Perfil</h1>
        <form>
            <div className="inputsPerfil">
              <label htmlFor="nome">Seu nome:</label>
              <input
                  type="text"
                  id="nome"
                  value={perfil.nome}
                  onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
              />
            </div>

            <div className="inputsPerfil">
              <label htmlFor="email">Seu email:</label>
              <input
                  type="email"
                  id="email"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
              />
            </div>

            <div className="inputsPerfil">
              <label htmlFor="nome-fantasia">Seu nome fantasia:</label>
              <input
                  type="text"
                  id="nome-fantasia"
                  value={perfil.nome_fantasia}
                  onChange={(e) => setPerfil({ ...perfil, nome_fantasia: e.target.value })}
              />
            </div>

            <div className="inputsPerfil">
              <label htmlFor="cnpj">Seu CNPJ:</label>
              <input
                  type="text"
                  id="cnpj"
                  value={perfil.cnpj}
                  onChange={(e) => setPerfil({ ...perfil, cnpj: e.target.value })}
              />
            </div>
            <div className="inputsPerfil">
              <label htmlFor="telefone">Seu telefone:</label>
              <input
                  type="text"
                  id="telefone"
                  value={perfil.telefone || ""}
                  onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
              />
            </div>

            <div className="inputsPerfil">
              <label htmlFor="cep">Seu CEP:</label>
              <input
                type="text"
                id="cep"
                value={perfil.cep || ""}
                onChange={(e) => setPerfil({ ...perfil, cep: e.target.value })}
                className={cepErro ? "input-erro" : ""}
              />
              {cepErro && <span className="error-message">{cepErro}</span>}
            </div>
            <div className="inputsPerfil">
              <label htmlFor="endereco">Seu endereço:</label>
              <input
                  type="text"
                  id="endereco"
                  value={perfil.endereco || ""}
                  onChange={(e) => setPerfil({ ...perfil, endereco: e.target.value })}
              />
            </div>
        </form>
        {mensagem.texto && (
          <div className={`mensagem-status ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}
        <button className="button button-md" onClick={updatePerfil}>Atualizar</button>
        <button className="button button-md" onClick={deslogar}>Deslogar</button>
        <button className="danger-button danger-btn" onClick={excluirConta}>Excluir conta</button>
      </div>
    </main>
  );
}

export default Perfil;