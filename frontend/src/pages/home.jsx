import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import Salas from '../components/ListSalas.jsx'; 
function Home() {
    const links = [
        { path: "/", label: "Bienvenidos" },
        { path: "/login", label: "Iniciar sesión" },
        { path: "/register", label: "Registrarse" },
    ];

    return (
        <>
            <Navbar links={links} />
            <div className="home-content">
                <h2>¡Bienvenido a nuestra Gestión de Salas y Reservas!</h2>
                <p>Transforma la manera en que gestionas tus reservas. ¡Más rápido, fácil y sin estrés!</p>
                
                <div className="features">
                    <div className="feature-card">
                        <img src="https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fácil de usar"className="feature-img" />
                        <h3>Fácil de usar</h3>
                        <p>Disfruta de una plataforma intuitiva que te ahorra tiempo.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://i.pinimg.com/736x/45/b7/c3/45b7c3267b6aeeb408b3716083d3270b.jpg" alt="Reserva rápida" className="feature-img"/>
                        <h3>Reserva rápida</h3>
                        <p>Con solo unos clics, asegura tu sala en minutos.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://i.pinimg.com/736x/24/54/75/245475fac9f08520a957cfd9318e0aed.jpg" alt="Confirmación inmediata" className="feature-img"/>
                        <h3>Confirmación inmediata</h3>
                        <p>Recibe confirmación en tiempo real para garantizar tu reserva.</p>
                    </div>
                </div>
                {/* Nueva sección: Salas Disponibles */}<br/>
                <div className='salas'>
                    <Salas />
                </div>
                <div className="home-section">
                    <h3>¿Listo para gestionar tus reservas de manera eficiente?</h3>
                    <Link className='home-section' to="/register">
                        <button className="home-button">Registrate</button>
                    </Link>
                </div>
                  
            </div>
        </>
    );
}

export default Home;
