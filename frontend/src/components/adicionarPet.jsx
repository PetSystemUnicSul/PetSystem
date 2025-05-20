import React, { useState, useEffect } from "react";
import { SquareX } from "lucide-react";
import "../styles/adicionarCliente.css";

function AdicionarPet({ onClose, onSalvar }) {
  const [especies, setEspecies] = useState([
    { nome: "cachorro", racas: ["akita", "basset", "beagle", "border-collie", "boxer", "bul-terrier", "bulldog", "cane-corso", "chihuahua", "cocker", "dachshund", "doberman", "fox-paulistinha", "golden", "husky", "labrador", "lhasa-apso", "maltes", "pastor-alemao", "pastor-belga", "pastor-suiço", "pekingese", "pinscher", "poodle", "pug", "rottweiler", "shihtzu", "spitz", "weimaraner", "yorkshire"] },
    { nome: "gato", racas: ["abissinio", "americano-pelo-curto", "angora", "azul-russo", "balines", "bengal", "british-shorthair", "burmes", "chartreux", "cornish-rex", "devon-rex", "exotico", "floresta-norueguesa", "himalayan", "javanes", "korat", "laperm", "maine-coon", "manx", "munchkin", "noruegues", "ocicat", "oriental", "persa", "ragdoll", "savannah", "siames", "singapura", "somali", "sphynx", "turkish-angora"] },
    { nome: "ave", racas: ["agapornis", "anarajuba", "anuri", "arara", "ararinha-azul", "azulão", "cacatua", "cacatua-rosa", "calopsita", "canario", "coleiro", "curica", "curio", "diamante-gould", "jacutinga", "jandaia", "lóris", "maina", "mandarim", "maritaca", "papagaio", "papagaio-do-mangue", "periquitão", "periquito", "periquito-australiano", "pombinha", "rolinha", "sabia", "trinca-ferro", "tucano"] },
    { nome: "reptil", racas: ["camaleao", "cágado", "cobra-cornsnake", "cobra-rei-california", "dragao-barbudo", "gecko-leopardo", "iguana-verde", "jabuti", "tartaruga-tigre-dagua", "teiu"] }
  ]);

  const [racasFiltradas, setRacasFiltradas] = useState([]);
  const [formData, setFormData] = useState({
    nomePet: "",
    especie: "",
    raca: "",
    idade: "",
    sexo: "",
    observacoesPet: ""
  });

  useEffect(() => {
    const especieSelecionada = especies.find(especie => especie.nome === formData.especie);
    if (especieSelecionada) {
      setRacasFiltradas(especieSelecionada.racas);
    } else {
      setRacasFiltradas([]);
    }
  }, [formData.especie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nomePet || !formData.especie || !formData.raca || !formData.idade || !formData.sexo) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
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
              required
            >
              <option value="">Selecione a Espécie</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="ave">Ave</option>
              <option value="reptil">Reptil</option>
            </select>
          </div>

          <div>
            <label>Raça:</label>
            <select 
              name="raca" 
              id="raca"
              value={formData.raca}
              onChange={handleChange}
              required
              disabled={!formData.especie}
            >
              <option value="">Selecione a Raça</option>
              {racasFiltradas.length === 0 ? (
                <option disabled>Selecione a Espécie primeiro</option>
              ) : (
                racasFiltradas.map((raca) => (
                  <option key={raca} value={raca}>
                    {raca.charAt(0).toUpperCase() + raca.slice(1)}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label>Ano de nascimento:</label>
            <input
              type="number"
              name="idade"
              id="idade"
              placeholder="Ex: 2006"
              value={formData.idade}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div>
            <label>Sexo:</label>
            <select 
              name="sexo" 
              id="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Sexo</option>
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
