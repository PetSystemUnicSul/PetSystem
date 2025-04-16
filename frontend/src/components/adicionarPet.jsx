import React, { useState } from "react";
import { SquareX } from "lucide-react";
import "../styles/adicionarCliente.css";

function AdicionarPet({ onClose, onSalvar }) {
  const [formData, setFormData] = useState({
    nomePet: "",
    especie: "cachorro",
    raca: "akita",
    sexo: "M",
    observacoesPet: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Adicionar Pet</h2>

          <button className="btn-fechar" onClick={onClose}>
            <SquareX size={24} />
          </button>
        </div>

        <form className="form-cliente" onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nomePet"
              id="nomePet"
              placeholder="Digite o nome do pet"
              value={formData.nomePet}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Espécie:</label>
            <select 
              name="especie" 
              id="especie"
              value={formData.especie}
              onChange={handleChange}
            >
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="ave">Ave</option>
            </select>
          </div>

          <div>
            <label>Raça:</label>
            <select 
              name="raca" 
              id="raca"
              value={formData.raca}
              onChange={handleChange}
            >
              <optgroup label="Cachorro">
                <option value="akita">Akita</option>
                <option value="basset">Basset Hound</option>
                <option value="beagle">Beagle</option>
                <option value="border-collie">Border Collie</option>
                <option value="boxer">Boxer</option>
                <option value="bul-terrier">Bull Terrier</option>
                <option value="bulldog">Bulldog</option>
                <option value="cane-corso">Cane Corso</option>
                <option value="chihuahua">Chihuahua</option>
                <option value="cocker">Cocker Spaniel</option>
                <option value="dachshund">Dachshund (Salsicha)</option>
                <option value="doberman">Doberman</option>
                <option value="fox-paulistinha">Fox Paulistinha</option>
                <option value="golden">Golden Retriever</option>
                <option value="husky">Husky Siberiano</option>
                <option value="labrador">Labrador</option>
                <option value="lhasa-apso">Lhasa Apso</option>
                <option value="maltes">Maltês</option>
                <option value="pastor-alemao">Pastor Alemão</option>
                <option value="pastor-belga">Pastor Belga</option>
                <option value="pastor-suiço">Pastor Suíço</option>
                <option value="pekingese">Pequinês</option>
                <option value="pinscher">Pinscher</option>
                <option value="poodle">Poodle</option>
                <option value="pug">Pug</option>
                <option value="rottweiler">Rottweiler</option>
                <option value="shihtzu">Shih Tzu</option>
                <option value="spitz">Spitz Alemão</option>
                <option value="weimaraner">Weimaraner</option>
                <option value="yorkshire">Yorkshire</option>
              </optgroup>

              <optgroup label="Gato">
                <option value="abissinio">Abissínio</option>
                <option value="americano-pelo-curto">Americano de Pelo Curto</option>
                <option value="angora">Angorá</option>
                <option value="azul-russo">Azul Russo</option>
                <option value="balines">Balinês</option>
                <option value="bengal">Bengal</option>
                <option value="british-shorthair">British Shorthair</option>
                <option value="burmes">Burmês</option>
                <option value="chartreux">Chartreux</option>
                <option value="cornish-rex">Cornish Rex</option>
                <option value="devon-rex">Devon Rex</option>
                <option value="exotico">Exótico</option>
                <option value="floresta-norueguesa">Floresta Norueguesa</option>
                <option value="himalayan">Himalaio</option>
                <option value="javanes">Javanês</option>
                <option value="korat">Korat</option>
                <option value="laperm">LaPerm</option>
                <option value="maine-coon">Maine Coon</option>
                <option value="manx">Manx</option>
                <option value="munchkin">Munchkin</option>
                <option value="noruegues">Norueguês</option>
                <option value="ocicat">Ocicat</option>
                <option value="oriental">Oriental Shorthair</option>
                <option value="persa">Persa</option>
                <option value="ragdoll">Ragdoll</option>
                <option value="savannah">Savannah</option>
                <option value="siames">Siamês</option>
                <option value="singapura">Singapura</option>
                <option value="somali">Somali</option>
                <option value="sphynx">Sphynx</option>
                <option value="turkish-angora">Turkish Angora</option>
              </optgroup>

              <optgroup label="Ave">
                <option value="agapornis">Agapornis</option>
                <option value="anarajuba">Ararajuba</option>
                <option value="anuri">Anuri</option>
                <option value="arara">Arara</option>
                <option value="ararinha-azul">Ararinha Azul</option>
                <option value="azulão">Azulão</option>
                <option value="cacatua">Cacatua</option>
                <option value="cacatua-rosa">Cacatua Rosa</option>
                <option value="calopsita">Calopsita</option>
                <option value="canario">Canário</option>
                <option value="coleiro">Coleiro</option>
                <option value="curica">Curica</option>
                <option value="curio">Curió</option>
                <option value="diamante-gould">Diamante de Gould</option>
                <option value="jacutinga">Jacutinga</option>
                <option value="jandaia">Jandaia</option>
                <option value="lóris">Lóris</option>
                <option value="maina">Mainá</option>
                <option value="mandarim">Mandarim</option>
                <option value="maritaca">Maritaca</option>
                <option value="papagaio">Papagaio</option>
                <option value="papagaio-do-mangue">Papagaio-do-Mangue</option>
                <option value="periquitão">Periquitão</option>
                <option value="periquito">Periquito</option>
                <option value="periquito-australiano">Periquito Australiano</option>
                <option value="pombinha">Pombinha</option>
                <option value="rolinha">Rolinha</option>
                <option value="sabia">Sabiá</option>
                <option value="trinca-ferro">Trinca-Ferro</option>
                <option value="tucano">Tucano</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label>Sexo:</label>
            <select 
              name="sexo" 
              id="sexo"
              value={formData.sexo}
              onChange={handleChange}
            >
              <option value="M">Macho</option>
              <option value="F">Fêmea</option>
            </select>
          </div>

          <div>
            <label>Observação:</label>
            <textarea 
              name="observacoesPet" 
              id="observacoesPet"
              value={formData.observacoesPet}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="button-md button">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdicionarPet;