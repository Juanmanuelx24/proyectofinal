import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';      
import Register from './components/register'; 
import Home from './pages/home';  // Nuevo componente Home
import Header from './components/header';  // Barra de navegación
import AdminDashboard from './pages/admin'; // Importa el componente admin

function App() {
  return (
    <Router>
      <Header /> {/* Barra de navegación global */}
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página de bienvenida */}
        <Route path="/login" element={<Login />} />  {/* Formulario de login */}
        <Route path="/register" element={<Register />} />  {/* Formulario de registro */}
        <Route path="/admin" element={<AdminDashboard />} />  {/* Ruta del dashboard de admin */}
      </Routes>
    </Router>
  );
}

export default App;

