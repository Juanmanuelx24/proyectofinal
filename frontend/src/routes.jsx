import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin'; // Importa la página admin.jsx
import Login from './pages/login'; // Importa la página de login
import Register from './pages/register'; // Importa la página de registro

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Ruta de inicio */}
      <Route path="/register" element={<Register />} /> {/* Ruta de registro */}
      <Route path="/admin" element={<AdminDashboard />} /> {/* Ruta para el dashboard de admin */}
      {/* Otras rutas */}
    </Routes>
  );
}

export default RoutesConfig;


