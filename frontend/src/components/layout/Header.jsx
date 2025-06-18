import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const user = localStorage.getItem('userEmail')

  return (
    <header className="header">
      <div>
        <h1 className="text-xl font-semibold text-primary">
          Painel Administrativo SESC
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-1" style={{ borderRadius: '50%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <Bell style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-text-secondary)' }} />
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            height: '0.5rem',
            width: '0.5rem',
            backgroundColor: 'var(--color-error)',
            borderRadius: '50%'
          }}></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div style={{
            backgroundColor: 'rgba(34, 104, 178, 0.1)',
            color: 'var(--color-primary)',
            borderRadius: '50%',
            padding: '0.5rem'
          }}>
            <User style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div>
            <p className="text-sm font-medium">{ user || 'Usuário'}</p>
            <p className="text-xs text-secondary">{user?.role || 'Cargo'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;