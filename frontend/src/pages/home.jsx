import React from "react";
import "../styles/home.css";
import cachorro from "../assets/images/cachorro.jpg";
import Header from "../components/header";

function Home() {
  return (
    <>
      <Header />
      <div className="main">
        {/* ------ Seção Intro ------ */}
        <section className="intro">
          <div className="intro-banner">
            <img src={cachorro} className="intro-img" />
          </div>
          <div className="intro-container">
            <h1 className="title">Boas-vindas a PetSystem</h1>
            <p>
              Onde cuidar do seu pet nunca foi tão fácil. Nosso objetivo é
              simplificar a vida dos tutores oferecendo uma plataforma completa
              para gerenciar todos os aspectos da saúde e bem-estar dos seus
              animais de estimação. Desde o cadastro detalhado de pets e o
              agendamento de consultas até o controle de vacinas e vermífugos,
              estamos aqui para proporcionar organização e tranquilidade para
              você e seus companheiros peludos.
            </p>
          </div>
        </section>

        {/* ------ Seção Funcionalidades ------ */}
        <section className="funcionalidades">
          <h1 className="title">Funcionalidades</h1>
          <div className="funcionalidades-container">
            {/* funcionalidade 1 */}
            <div className="func">
              <div className="icon">
                <img src={cachorro} alt="" className="func-icon" />
              </div>
              <div className="text">
                <h2 className="func-title">Cadastro de Pets</h2>
                <span>
                  Registre e atualize informações dos pets, como nome, raça e
                  idade.
                </span>
              </div>
            </div>
            {/* funcionalidade 2 */}
            <div className="func">
              <div className="icon">
                <img src={cachorro} alt="" className="func-icon" />
              </div>
              <div className="text">
                <h2 className="func-title">Agendamento de Consultas</h2>
                <span>
                  Agende e acompanhe consultas veterinárias com histórico de
                  diagnósticos.
                </span>
              </div>
            </div>
            {/* ------ Funcionalidade 3 ------*/}
            <div className="func">
              <div className="icon">
                <img src={cachorro} alt="" className="func-icon" />
              </div>
              <div className="text">
                <h2 className="func-title">Cadastro de clientes</h2>
                <span>Registre e atualize informações dos donos dos pets.</span>
              </div>
            </div>
            {/* ------ Funcionalidade 4 ------ */}
            <div className="func">
              <div className="icon">
                <img src={cachorro} alt="" className="func-icon" />
              </div>
              <div className="text">
                <h2 className="func-title">Dashboard</h2>
                <span>
                  Visualização detalhada dos agendamentos e serviços realizados.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ------ Seção Planos ------ */}
        <section className="planos">
          <h1 className="title">Planos</h1>
          <div className="planos-container">
            {/* ------- Plano 1 ------- */}
            <div className="plano">
              <h2 className="plano-title">Básico Mensal</h2>
              <ul>
                <li>Cadastro de pets</li>
                <li>Cadastro de clientes</li>
                <li>Agendamento de consultas</li>
              </ul>
              <span className="valor">R$ 80,00</span>
              <div className="btn-plano">Assinar</div>
            </div>
            {/* ------- Plano 2 ------- */}
            <div className="plano">
              <h2 className="plano-title">Premium Mensal</h2>
              <ul>
                <li>Cadastro de pets</li>
                <li>Cadastro de clientes</li>
                <li>Agendamento de consultas</li>
                <li>Dashboard detalhado</li>
              </ul>
              <div className="preco">
              <span className="valor">R$ 120,00</span>
              </div>
              <div className="btn-plano">Assinar</div>
            </div>
            {/* ------- Plano 3 ------- */}
            <div className="plano-anual">
              <h2 className="plano-title">Anual</h2>
              <p>Todas as funcionalidades do plano Premium Mensal.</p>
              <div className="preco">
              <span className="valor">R$ 1200,00</span>
              </div>
              <div className="btn-plano">Assinar</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
