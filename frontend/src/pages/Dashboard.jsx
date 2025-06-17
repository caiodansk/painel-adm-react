import React, { useState } from 'react';
import { CreditCard, Users, FileText, TrendingUp } from 'lucide-react';
import { mockCredentials } from '../data/mockData';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const filteredCredentials = mockCredentials.filter(
    credential => 
      credential.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.cpf.includes(searchTerm)
  );
  
  // Stats
  const activeCredentials = mockCredentials.filter(c => c.status === 'active').length;
  const inactiveCredentials = mockCredentials.filter(c => c.status === 'inactive').length;
  const analysisCredentials = mockCredentials.filter(c => c.status === 'analysis').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Painel de Credenciais</h1>
        <Link to="/credentials/new">
          <Button variant="primary">
            Cadastrar Credencial
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <CreditCard style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Total de Credenciais</h3>
            <p>{mockCredentials.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon success">
            <Users style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Credenciais Ativas</h3>
            <p>{activeCredentials}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon error">
            <FileText style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Credenciais Inativas</h3>
            <p>{inactiveCredentials}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon accent">
            <TrendingUp style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Em Análise</h3>
            <p>{analysisCredentials}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Credentials Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Credenciais Recentes</h2>
          <SearchBar 
            placeholder="Buscar por nome ou CPF" 
            onSearch={handleSearch} 
          />
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCredentials.map((credential) => (
                <tr key={credential.id}>
                  <td>{credential.name}</td>
                  <td>{credential.cpf}</td>
                  <td>
                    <StatusBadge status={credential.status} />
                  </td>
                  <td>{new Date(credential.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <Link to={`/credentials/${credential.id}`}>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredCredentials.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    Nenhuma credencial encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <Link to="/credentials">
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;