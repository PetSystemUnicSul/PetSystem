import { useNavigate } from "react-router-dom";
import "../styles/clienteDashboard.css";
import "../styles/perfil.css";
import axios from "axios";

function Perfil() {

    const navigate = useNavigate();

    function deslogar() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

     async function excluirConta() {
        try {
            const response = await axios.delete(`http://192.168.68.138:3000/perfil`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            deslogar();
        }catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Erro ao excluir conta. Tente novamente.");
        }
    }

  return (
    <main className="mainDashboard">
        <div className="divPerfil">
            <h1>Seu Perfil</h1>
            <form action="">
                <label>Seu nome:</label>
                <input type="text" />

                <label>Seu email:</label>
                <input type="email" />

                <label>Seu nome fantasia:</label>
                <input type="text" />

                <label>Seu CNPJ:</label>
                <input type="text" />

                <button className="button button-md">Salvar alterações</button>
            </form>
            <button className="button button-md" onClick={deslogar}>Deslogar</button>
            <button className="danger-button danger-btn" onClick={excluirConta}>Excluir conta</button>
        </div>
    </main>
  );
}

export default Perfil;