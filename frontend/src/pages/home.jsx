import React from "react";
import "../styles/home.css";
import cachorro from "../assets/images/cachorro.jpg";
import Header from "../components/header";

function Home() {
  return (
    <>
      <Header />
      <div className="main">
        <section className="intro">
          <img src={cachorro} className="intro-img" />
          <h1 className="title">Bem-vindo a PetSystem</h1>
          <p>
            Onde cuidar do seu pet nunca foi tão fácil. Nosso objetivo é
            simplificar a vida dos tutores oferecendo uma plataforma completa
            para gerenciar todos os aspectos da saúde e bem-estar dos seus
            animais de estimação. Desde o cadastro detalhado de pets e o
            agendamento de consultas até o controle de vacinas e vermífugos,
            estamos aqui para proporcionar organização e tranquilidade para você
            e seus companheiros peludos.
          </p>
        </section>

        <section className="funcionalidades">
          <h1 className="title">Funcionalidades</h1>
          <div className="funcionalidades-container">
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
            <div className="func">
              <div className="icon">
                <img src={cachorro} alt="" className="func-icon" />
              </div>
              <div className="text">
                <h2 className="func-title">Cadastro de Consultas</h2>
                <span>
                  Agende e acompanhe consultas veterinárias com histórico de
                  diagnósticos.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
