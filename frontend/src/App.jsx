import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Dashboard from "./pages/dashboard";
import { isAuthenticated } from "./utils/authUtils";

function App() {
  function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
          
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            } 
          />
      </Routes>
    </Router>
  );
}

export default App;