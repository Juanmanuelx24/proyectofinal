import { MdDashboard } from 'react-icons/md'; 
import Logout from '../Logout'; 

function NavbarAdmin() {
  return (
    <nav className="navbar">
      <h1 className='titulo'>
        <MdDashboard style={{ marginRight: '8px' }} />
        Dashboard Admin
      </h1> 
      <ul>

        <li><Logout /></li> 
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
