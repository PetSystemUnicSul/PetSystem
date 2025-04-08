import React from "react";
import "../styles/home.css";
import cachorro from "../assets/images/cachorro.jpg";

function Home() {
  return (
    <>
      <div className="main">
        <div className="intro">
          <img src={cachorro} className="intro-img" />
          <h1 className="title">Titulo</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            excepturi, doloribus eum nam aperiam, beatae porro ratione voluptate
            sunt placeat ab perspiciatis vitae eligendi? Officiis maxime omnis
            ipsa mollitia saepe!
          </p>
          <h2 className="title">Conheça a PetSystem</h2>
          <div className="intro-display">
            <img src={cachorro} alt="" />
            <img src={cachorro} alt="" />
            <img src={cachorro} alt="" />
            <img src={cachorro} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
