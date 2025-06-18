import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Home, CreditCard, ListFilter, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Inicializa o hook

  const handleLogout = () => {
    logout();           // Executa a função de logout
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Logo />
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              <Home style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/credentials" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <CreditCard style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Credenciais</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/logs" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <ListFilter style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Logs</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Configurações</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--color-gray-200)' }}>
        <button 
          onClick={handleLogout}
          className="nav-link w-full"
          style={{ 
            backgroundColor: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '0.375rem'
          }}
        >
          <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
