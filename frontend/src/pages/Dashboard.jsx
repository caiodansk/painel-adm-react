import React, { useState, useEffect } from 'react';
import { CreditCard, Users, FileText, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { getPedidosCredencial } from '../services/pedidos';

import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';

const Dashboard = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidosCredencial(setPedidos);
  }, []);

  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  // Contadores dinâmicos
  const total = pedidos.length;
  const aprovados = pedidos.filter(p => p.status_pedido === 'APROVADO').length;
  const rejeitados = pedidos.filter(p => p.status_pedido === 'REJEITADO').length;
  const pendentes = pedidos.filter(p => p.status_pedido === 'PENDENTE').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Painel de Credenciais</h1>
        <Link to="/credentials/new">
          <Button variant="primary">Cadastrar Credencial</Button>
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
            <p>{total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <Users style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Credenciais Ativas</h3>
            <p>{aprovados}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon error">
            <FileText style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Credenciais Inativas</h3>
            <p>{rejeitados}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon accent">
            <TrendingUp style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div className="stat-content">
            <h3>Em Análise</h3>
            <p>{pendentes}</p>
          </div>
        </div>
      </div>

      {/* Recent Credentials Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Credenciais Recentes</h2>
          <SearchBar placeholder="Buscar por nome ou CPF" />
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
              {pedidos.map((credential) => (
                <tr key={credential.id}>
                  <td>{credential.nome_pf || '-'}</td>
                  <td>{formatCPF(credential.cpf_pf)}</td>
                  <td>
                    <StatusBadge status={credential.status_pedido} />
                  </td>
                  <td>
                    {credential.data_pedido
                      ? format(new Date(credential.data_pedido), 'dd/MM/yyyy')
                      : '-'}
                  </td>
                  <td>
                    <Link to={`/credentials/${credential.id}`}>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {pedidos.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      padding: '1rem',
                      textAlign: 'center',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
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
