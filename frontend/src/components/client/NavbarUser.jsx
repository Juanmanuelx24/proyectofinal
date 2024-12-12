import { FaUserCircle } from 'react-icons/fa'; 
import Logout from '../Logout'; 

function NavbarUser() {
  return (
    <nav className="navbar">
      <h1 className="titulo">
        <FaUserCircle style={{ marginRight: '8px' }} /> 
        Dashboard Usuario
      </h1> 
      <ul>
        <li><Logout /></li> 
      </ul>
    </nav>
  );
}

export default NavbarUser;
