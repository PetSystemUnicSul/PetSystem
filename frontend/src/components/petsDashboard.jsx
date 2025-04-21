import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import "../styles/clienteDashboard.css";
import CardPetDashboard from "./cardPetsDashboard";
import DetalhesPet from "../components/detalhesPet"; 

function PetsDashboard() {
  const [popupAberto, setPopupAberto] = useState(null)
  const [petSelecionado, setPetSelecionado] = useState(null);
  const [dadosPets, setDadosPets] = useState([]);
  const [petsFiltrados, setPetsFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const abrirPopupDetalhes = (pet) => {
    setPetSelecionado(pet);
    setPopupAberto("detalhes");
  };

  const fecharPopup = () => setPopupAberto(null);

  async function buscarDadosPets() {
    try {
      const response = await axios.get("https://petsystem-backend.onrender.com/pets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDadosPets(response.data);
      setPetsFiltrados(response.data);
    } catch (err) {
      console.error("Erro ao buscar pets:", err);
    }
  }

  useEffect(() => {
    buscarDadosPets();
    
  }, []);

  useEffect(() => {
    if (termoPesquisa === "") {
      setPetsFiltrados(dadosPets);
      return;
    }

    const termoMinusculo = termoPesquisa.toLowerCase();
    let resultado = [];

    resultado = dadosPets.filter((pet) =>
      pet.pet_nome.toLowerCase().includes(termoMinusculo)
    );

    setPetsFiltrados(resultado);
  }, [termoPesquisa, dadosPets]);

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloPet">Pets</h1>
        </div>
        <div className="searchEfiltro">
          <div className="campoSearch">
            <input
              type="text"
              placeholder="Buscar Pets..."
              value={termoPesquisa}
              onChange={handlePesquisaChange}
            />
            <Search size={25} className="iconeSearch" />
          </div>
        </div>
      </div>

      <div className="bar">
        <p>Pet</p>
        <p>Especie</p>
        <p>Raça</p>
        <p>Sexo</p>
      </div>

      <div className="listPets">
        {petsFiltrados.map((pet, index) => (
          <CardPetDashboard
            onClick={() => abrirPopupDetalhes(pet)}
            key={index}
            dadoPet={pet}
          />
        ))}

        {petsFiltrados.length === 0 && (<div className="mensagem-sem-resultados">Nenhum pet encontrado.</div>)}
      </div>
      {popupAberto === "detalhes" && (<DetalhesPet onClose={fecharPopup} pet={petSelecionado}/> )}
    </main>
  );
}

export default PetsDashboard;
