import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import StatusBadge from '../components/ui/StatusBadge';
import { getPedidosCredencial } from '../services/pedidos';

const formatCPF = (cpf) => {
  if (!cpf) return '';
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};

const CredentialList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    getPedidosCredencial(setPedidos);
  }, []);

  useEffect(() => {
    const filtered = pedidos.filter((p) => {
      const matchesSearch =
        p.nome_pf?.toLowerCase().includes(searchTerm) ||
        p.cpf_pf?.includes(searchTerm.replace(/[^\d]/g, '')); // remove pontos e traços

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && p.status_pedido === 'APROVADO') ||
        (statusFilter === 'inactive' && p.status_pedido === 'REJEITADO') ||
        (statusFilter === 'analysis' && p.status_pedido === 'PENDENTE');

      return matchesSearch && matchesStatus;
    });

    setFilteredPedidos(filtered);
  }, [pedidos, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Credenciais</h1>
        <Link to="/credentials/new">
          <Button 
            variant="primary"
            icon={<Plus style={{ width: '1rem', height: '1rem' }} />}
          >
            Nova Credencial
          </Button>
        </Link>
      </div>
      
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <SearchBar 
            placeholder="Buscar por nome ou CPF" 
            onSearch={handleSearch} 
          />
          
          <div className="flex items-center">
            <Filter style={{ width: '1rem', height: '1rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem' }} />
            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="analysis">Em Análise</option>
            </select>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Status</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPedidos.map((credential) => (
                <tr key={credential.id}>
                  <td>{credential.nome_pf}</td>
                  <td>{formatCPF(credential.cpf_pf)}</td>
                  <td><StatusBadge status={credential.status_pedido} /></td>
                  <td>{credential.email_pf}</td>
                  <td>{credential.fone_pf}</td>
                  <td>{new Date(credential.data_pedido).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Link to={`/credentials/${credential.id}`}>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPedidos.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    Nenhuma credencial encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-secondary">
            Exibindo {filteredPedidos.length} de {pedidos.length} credenciais
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialList;
