import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
    </Router>
  );
}

export default App;
