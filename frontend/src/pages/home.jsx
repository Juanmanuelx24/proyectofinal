import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>¡Bienvenido a MeetingHub!</h1>
      <p>"Gestiona tus reservas de salas de manera sencilla, rápida y eficiente."
      </p>
      <div className="links">
        <Link to="/login">Iniciar sesión</Link>  {/* Enlace al formulario de login */}
        <Link to="/register">Registrarse</Link>  {/* Enlace al formulario de registro */}
      </div>
    </div>
  );
}

export default Home;
