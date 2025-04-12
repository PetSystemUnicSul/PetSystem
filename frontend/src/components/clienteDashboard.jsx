import { useState, useEffect } from "react";
import AdicionarCliente from "../components/adicionarCliente";
import DetalhesCliente from "../components/detalhesCliente";
import { Search, Funnel, CirclePlus } from "lucide-react";
import CardClienteDashboard from "./cardClienteDashboard";
import "../styles/clienteDashboard.css";

function ClienteDashboard() {
  const [popupAberto, setPopupAberto] = useState(null);
  const [dadosClientes, setDadosClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("Nome");

  const abrirPopupAdicionar = () => setPopupAberto("adicionar");
  const abrirPopupDetalhes = () => setPopupAberto("detalhes");
  const fecharPopup = () => setPopupAberto(null); 

  useEffect(() => {
    async function buscarDados() {
      const dados = [{"tutor":"Lucas Fernandes Riberio de Oliveira", "pets":["Pipow"],"telefone":"(11) 987654321","cpf":"12345678901","email":"lucas.f.r.o2015@gmail.com","endereco":"Rua Jose Rufino da silva"},{"tutor":"Maria Souza","pets":["Luna","Bella"],"telefone":"(11) 912345678","cpf":"23456789012","email":"maria@email.com","endereco":"Av B, 456"},{"tutor":"Carlos Oliveira","pets":["Thor"],"telefone":"(11) 923456789","cpf":"34567890123","email":"carlos@email.com","endereco":"Rua C, 789"},{"tutor":"Ana Pereira","pets":["Mimi","Toby","Zoe"],"telefone":"(11) 934567890","cpf":"45678901234","email":"ana@email.com","endereco":"Av D, 101"},{"tutor":"Pedro Santos","pets":["Max"],"telefone":"(11) 945678901","cpf":"56789012345","email":"pedro@email.com","endereco":"Rua E, 202"},{"tutor":"Lucia Lima","pets":["Bilu","Mel"],"telefone":"(11) 956789012","cpf":"67890123456","email":"lucia@email.com","endereco":"Av F, 303"},{"tutor":"Marcos Rocha","pets":["Luke"],"telefone":"(11) 967890123","cpf":"78901234567","email":"marcos@email.com","endereco":"Rua G, 404"},{"tutor":"Fernanda Costa","pets":["Nina","Lola"],"telefone":"(11) 978901234","cpf":"89012345678","email":"fernanda@email.com","endereco":"Av H, 505"},{"tutor":"Ricardo Alves","pets":["Bob"],"telefone":"(11) 989012345","cpf":"90123456789","email":"ricardo@email.com","endereco":"Rua I, 606"},{"tutor":"Juliana Martins","pets":["Lucky","Bela","Jack"],"telefone":"(11) 990123456","cpf":"01234567890","email":"juliana@email.com","endereco":"Av J, 707"},{"tutor":"Eduardo Ferreira","pets":["Rocky"],"telefone":"(11) 901234567","cpf":"11223344556","email":"eduardo@email.com","endereco":"Rua K, 808"},{"tutor":"Patricia Gomes","pets":["Lily","Milo"],"telefone":"(11) 998765432","cpf":"22334455667","email":"patricia@email.com","endereco":"Av L, 909"},{"tutor":"Roberto Nunes","pets":["Duke"],"telefone":"(11) 987654321","cpf":"33445566778","email":"roberto@email.com","endereco":"Rua M, 1010"},{"tutor":"Camila Dias","pets":["Bella","Charlie"],"telefone":"(11) 976543210","cpf":"44556677889","email":"camila@email.com","endereco":"Av N, 1111"},{"tutor":"Gustavo Barbosa","pets":["Zeus"],"telefone":"(11) 965432109","cpf":"55667788990","email":"gustavo@email.com","endereco":"Rua O, 1212"},{"tutor":"Sandra Ribeiro","pets":["Luna","Max","Teddy"],"telefone":"(11) 954321098","cpf":"66778899001","email":"sandra@email.com","endereco":"Av P, 1313"},{"tutor":"Felipe Cardoso","pets":["Simba"],"telefone":"(11) 943210987","cpf":"77889900112","email":"felipe@email.com","endereco":"Rua Q, 1414"},{"tutor":"Aline Castro","pets":["Mia","Oliver"],"telefone":"(11) 932109876","cpf":"88990011223","email":"aline@email.com","endereco":"Av R, 1515"},{"tutor":"Daniel Mendes","pets":["Buddy"],"telefone":"(11) 921098765","cpf":"99001112234","email":"daniel@email.com","endereco":"Rua S, 1616"},{"tutor":"Tatiana Lopes","pets":["Coco","Lola"],"telefone":"(11) 910987654","cpf":"00112233445","email":"tatiana@email.com","endereco":"Av T, 1717"},{"tutor":"Rodrigo Xavier","pets":["Rex"],"telefone":"(11) 909876543","cpf":"11223344556","email":"rodrigo@email.com","endereco":"Rua U, 1818"},{"tutor":"Vanessa Teixeira","pets":["Bella","Milo","Toby"],"telefone":"(11) 998765432","cpf":"22334455667","email":"vanessa@email.com","endereco":"Av V, 1919"},{"tutor":"Paulo Henrique","pets":["Jack"],"telefone":"(11) 987654321","cpf":"33445566778","email":"paulo@email.com","endereco":"Rua W, 2020"},{"tutor":"Larissa Moreira","pets":["Luna","Bilu"],"telefone":"(11) 976543210","cpf":"44556677889","email":"larissa@email.com","endereco":"Av X, 2121"},{"tutor":"Hugo Batista","pets":["Max"],"telefone":"(11) 965432109","cpf":"55667788990","email":"hugo@email.com","endereco":"Rua Y, 2222"},{"tutor":"Isabela Freitas","pets":["Nina","Zoe"],"telefone":"(11) 954321098","cpf":"66778899001","email":"isabela@email.com","endereco":"Av Z, 2323"},{"tutor":"Leonardo Campos","pets":["Thor","Lucky"],"telefone":"(11) 943210987","cpf":"77889900112","email":"leonardo@email.com","endereco":"Rua AA, 2424"},{"tutor":"Beatriz Duarte","pets":["Mel"],"telefone":"(11) 932109876","cpf":"88990011223","email":"beatriz@email.com","endereco":"Av BB, 2525"},{"tutor":"Rafael Siqueira","pets":["Bela","Luke"],"telefone":"(11) 921098765","cpf":"99001112234","email":"rafael@email.com","endereco":"Rua CC, 2626"},{"tutor":"Gabriela Rios","pets":["Rex","Lola"],"telefone":"(11) 910987654","cpf":"00112233445","email":"gabriela@email.com","endereco":"Av DD, 2727"}];
      setDadosClientes(dados);
      setClientesFiltrados(dados);
    }
    buscarDados();
  }, []);

  // Função para filtrar os clientes baseado no termo de pesquisa e campo selecionado
  useEffect(() => {
    if (termoPesquisa === "") {
      setClientesFiltrados(dadosClientes);
      return;
    }

    const termoMinusculo = termoPesquisa.toLowerCase();
    let resultado = [];

    switch (campoFiltro) {
      case "Nome":
        resultado = dadosClientes.filter(cliente =>
          cliente.tutor.toLowerCase().includes(termoMinusculo)
        );
        break;
      case "Telefone":
        resultado = dadosClientes.filter(cliente =>
          cliente.telefone.toLowerCase().includes(termoMinusculo)
        );
        break;
      case "Endereço":
        resultado = dadosClientes.filter(cliente =>
          cliente.endereco.toLowerCase().includes(termoMinusculo)
        );
        break;
      default:
        resultado = dadosClientes;
    }
    
    setClientesFiltrados(resultado);
  }, [termoPesquisa, campoFiltro, dadosClientes]);

  // Handler para atualizar o termo de pesquisa
  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  // Handler para atualizar o campo de filtro
  const handleFiltroChange = (e) => {
    setCampoFiltro(e.target.value);
  };

  return (
    <main className="mainDashboard">
      <div className="groupButtonsCliente">
        <div className="tituloEadic">
          <h1 className="tituloCliente">Clientes</h1>
          <button className="buttonAdicionar" onClick={abrirPopupAdicionar}>
            <CirclePlus size={18} />
            <span>Novo cliente</span>
          </button>
        </div>

        <div className="searchEfiltro">
          <div className="campoSearch">
            <input type="text" placeholder="Buscar cliente..." value={termoPesquisa} onChange={handlePesquisaChange}/>
            <Search size={25} className="iconeSearch" />
          </div>
          <div className="campoFiltro">
            <select name="filtroCliente" id="filtroClientes" className="filtroClientes" value={campoFiltro} onChange={handleFiltroChange}>
              <option value="Nome">Nome</option>
              <option value="Telefone">Telefone</option>
              <option value="Endereço">Endereço</option>
            </select>
            <Funnel size={40} className="iconFiltro" />
          </div>
        </div>
      </div>

      <div className="bar">
        <p>Nome</p>
        <p>Pets</p>
        <p>Telefone</p>
        <p>Endereço</p>
      </div>

      <div className="listCliente">
        {clientesFiltrados.map((cliente, index) => (
          <CardClienteDashboard onClick={abrirPopupDetalhes} key={index} dadoCliente={cliente} />
        ))}

        {clientesFiltrados.length === 0 && (
          <div className="mensagem-sem-resultados">
            Nenhum cliente encontrado com os critérios de pesquisa.
          </div>
        )}
      </div>

      {popupAberto === "adicionar" && <AdicionarCliente onClose={fecharPopup} />}
      {popupAberto === "detalhes" && <DetalhesCliente onClose={fecharPopup} />}
    </main>
  );
}

export default ClienteDashboard;