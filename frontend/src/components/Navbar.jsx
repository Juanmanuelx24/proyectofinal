import { Link } from 'react-router-dom';

function Navbar({ links }) {
    return (
        <nav className="navbar-home">
            <div className="navbar-logo">
                <img
                    src="https://img.freepik.com/vector-premium/logo-muebles-minimalistas_567288-594.jpg?w=1380"
                    alt="Logo"
                    className="navbar-image"
                />
                <h1 className="navbar-title">MeetingHub</h1>
            </div>
            <div className="navbar-links">
                {links.map((link, index) => (
                    <Link key={index} to={link.path} className="navbar-link">
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
export default Navbar;
