import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx'; 
import Register from './pages/register.jsx'; 
import Dashboard from './pages/UserDashboard.jsx'; 
import UserProfile from './components/client/UserProfile.jsx'; 
import DashboardAdmin from './pages/AdminDashboard.jsx';
import AdminProfile from './components/admin/AdminProfile.jsx'
import Home from './pages/Home.jsx'
import Salas from './components/ListSalas.jsx';
import './App.css'

function App() {
  return (
    <Router>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboardadmin" element={<DashboardAdmin />} />
            <Route path="/dashboarduser" element={<Dashboard />} />
            <Route path="/profileuser" element={<UserProfile />} />
            <Route path="/profiladmin" element={<AdminProfile />} />
            <Route path="/sala" element={<Salas />} />
              
        </Routes>
    </Router>
  );
}

export default App;
