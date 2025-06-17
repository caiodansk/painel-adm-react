import React, { useState } from 'react';
import { Filter, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { mockLogs } from '../data/mockData';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';

const LogsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredLogs = mockLogs
    .filter(log => {
      const matchesSearch = 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesResult = resultFilter === 'all' || log.result === resultFilter;
      
      return matchesSearch && matchesResult;
    });
  
  const getResultIcon = (result) => {
    switch (result) {
      case 'success':
        return <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-success)' }} />;
      case 'error':
        return <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-error)' }} />;
      case 'warning':
        return <Info style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-accent)' }} />;
      default:
        return null;
    }
  };
  
  const getResultClass = (result) => {
    switch (result) {
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-accent';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Histórico de Logs</h1>
        <Button variant="outline">
          Exportar Logs
        </Button>
      </div>
      
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <SearchBar 
            placeholder="Buscar por usuário ou ação" 
            onSearch={handleSearch} 
          />
          
          <div className="flex items-center">
            <Filter style={{ width: '1rem', height: '1rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem' }} />
            <select
              className="input"
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
            >
              <option value="all">Todos os resultados</option>
              <option value="success">Sucesso</option>
              <option value="error">Erro</option>
              <option value="warning">Alerta</option>
            </select>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Ação</th>
                <th>Usuário</th>
                <th>Data</th>
                <th>Resultado</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.action}</td>
                  <td>{log.user}</td>
                  <td className="flex items-center">
                    <Clock style={{ width: '1rem', height: '1rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem' }} />
                    {new Date(log.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td>
                    <div className="flex items-center">
                      {getResultIcon(log.result)}
                      <span className={`ml-2 ${getResultClass(log.result)}`}>
                        {log.result === 'success' ? 'Sucesso' : 
                         log.result === 'error' ? 'Erro' : 'Alerta'}
                      </span>
                    </div>
                  </td>
                  <td>{log.details || '-'}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    Nenhum log encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-secondary">
            Exibindo {filteredLogs.length} de {mockLogs.length} registros
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

export default LogsList;