import React from "react";
import "../styles/home.css";
import cachorro from "../assets/images/cachorro.jpg";
import tela from "../assets/images/tela-petsystem.jpg";
import Header from "../components/header";
import { Dog, CalendarCheck, UserRoundCheck, ChartColumn } from "lucide-react";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Header />
      <div className="main">
        {/* ------ Seção Intro ------ */}
        <section className="intro">
          <div className="image-container">
            <img src={cachorro} className="intro-img" />
            <div className="text-container">
              <h1 className="">PetSystem</h1>
              <p>
                A solução ideal para otimizar seu tempo e cuidar ainda melhor
                dos seus clientes peludos.
              </p>
              <div>
                <a href="" className="btn-assinar">
                  Assinar
                </a>
              </div>
            </div>
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
                <Dog size={50} className="func-icon" />
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
                <CalendarCheck size={50} className="func-icon" />
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
                <UserRoundCheck size={50} className="func-icon" />
              </div>
              <div className="text">
                <h2 className="func-title">Cadastro de clientes</h2>
                <span>Registre e atualize informações dos donos dos pets.</span>
              </div>
            </div>
            {/* ------ Funcionalidade 4 ------ */}
            <div className="func">
              <div className="icon">
                <ChartColumn size={50} className="func-icon" />
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
              <div className="plano-header">
                <h2 className="plano-title">Free</h2>
                <div className="preco">
                  <p className="valor">
                    <span>R$</span>
                    00,00
                  </p>
                </div>
              </div>
              <div className="plano-info">
                <p>
                  Ideal para: Petshops iniciantes ou com baixo volume de
                  agendamentos.
                </p>
                <ul>
                  <li>Cadastro de até 50 clientes.</li>
                  <li>Cadastro de até 50 animais.</li>
                  <li>Até 20 agendamentos mensais</li>
                  <li>Suporte básico via e-mail.</li>
                </ul>
              </div>
              <div className="btn-plano">Assinar</div>
            </div>
            {/* ------- Plano 2 ------- */}
            <div className="plano">
              <div className="plano-header">
                <h2 className="plano-title">Pro</h2>
                <div className="preco">
                  <p className="valor">
                    <span>R$</span>99,00/mês
                  </p>
                </div>
              </div>
              <div className="plano-info">
                <p>
                  Ideal para: Petshops em crescimento que buscam otimizar todas
                  as áreas do negócio.
                </p>
                <ul>
                  <li>Cadastro ilimitado de clientes.</li>
                  <li>Cadastro ilimitado de animais.</li>
                  <li>Agendamentos ilimitados.</li>
                  <li>Histórico completo de clientes e animais.</li>
                  <li>
                    Lembretes automáticos por e-mail para clientes (em breve via
                    SMS).
                  </li>
                </ul>
              </div>
              <div className="btn-plano">Assinar</div>
            </div>
          </div>
        </section>

        {/* Seção Vantagens */}
        <section className="vantagens">
          <div className="vantagens-container">
            <div className="vantagens-info">
          <h1 className="title">Completo para sua clínica veterinária</h1>
              <p>
                Muito mais organização para sua clínica, integrada com a agenda,
                banho e tosa, clientes e pets.
              </p>
              <ul>
                <li>Mais tempo livre para atividades mais produtivas</li>
                <li>Agendas por cliente e pet</li>
                <li>Histórico completo do pet</li>
                <li>Mais agilidade no agendamento</li>
                <li>Organização de cadastro de pets e tutores</li>
                <li>Histórico de agendamentos detalhado</li>
              </ul>
            </div>
              <div className="vantagens-img">
                <img src={tela} alt="" />
              </div>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
