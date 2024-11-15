import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Home from './components/HomeComponent';

function App() {
  return (
    <Router>
        {/* Definimos las rutas para Login y Register */}
        <Routes>
          <Route path="/login" element={<Login />} />  {/* Ruta para Login */}
          <Route path="/register" element={<Register />} />  {/* Ruta para Registro */}
          <Route path="/home" element={<Home />} />  {/* Ruta para Registro */}
        </Routes>
    </Router>
  );
}

export default App;
