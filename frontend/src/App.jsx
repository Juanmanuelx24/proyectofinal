import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Rutas de inicio de sesion y registro
import Login from './components/login';      
import Register from './components/register'; 
// Componente que sera la pagina principal
import Home from './pages/home';
  // Barra de navegación
import Header from './components/header';
 // Importa el componente admin - pagina de la vista con rol admin
import AdminDashboard from './pages/admin';
import UserDashboard from './pages/user';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página de bienvenida */}
        <Route path="/login" element={<Login />} />  {/* Formulario de login */}
        <Route path="/register" element={<Register />} />  {/* Formulario de registro */}
        <Route path="/admin" element={<AdminDashboard />} />  {/* Ruta del dashboard de admin */}
        <Route path="/user" element={<UserDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;

