import React, { useState, useEffect } from 'react';
import { Filter, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { mockLogs } from '../data/mockData';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import { getLogs } from '../services/logs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const LogsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  const [logs, setLogs] = useState([])
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    getLogs(setLogs)
  }, [])

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
      case 'sucesso':
        return <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-success)' }} />;
      case 'erro':
        return <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-error)' }} />;
      case 'atencao':
        return <Info style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-accent)' }} />;
      default:
        return null;
    }
  };
  
  const getResultClass = (result) => {
    switch (result) {
      case 'sucesso':
        return 'text-success';
      case 'erro':
        return 'text-error';
      case 'atencao':
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
              <option value="sucesso">Sucesso</option>
              <option value="erro">Erro</option>
              <option value="atencao">Alerta</option>
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
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.acao}</td>
                  <td>{log.user}</td>
                  <td className="flex items-center">
                    <Clock style={{ width: '1rem', height: '1rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem' }} />
                    {format(new Date(log.data_hora), "dd/MM/yyyy HH:mm", )}
                  </td>
                  <td>
                    <div className="flex items-center">
                      {getResultIcon(log.resultado)}
                      <span className={`ml-2 ${getResultClass(log.resultado)}`}>
                        {log.resultado === 'sucesso' ? 'Sucesso' : 
                         log.resultado === 'erro' ? 'Erro' : 'Alerta'}
                      </span>
                    </div>
                  </td>
                  <td>{log.detalhes || '-'}</td>
                </tr>
              ))}
              {logs.length === 0 && (
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