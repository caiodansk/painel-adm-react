import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ChevronLeft, User, Mail, Phone, MapPin, FileText, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { getPedidoDetalhes, atualizarStatusPedido } from '../services/pedidos';

const CredentialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [pedido, setPedido] = useState(null);

  const carregarPedido = () => {
    getPedidoDetalhes(id, (data) => {
      setPedido(data);
      setStatus(data.status_pedido);
    });
  };

  useEffect(() => {
    carregarPedido();
  }, [id]);

  if (!pedido) {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg text-secondary">pedido não encontrado</p>
        <Button
          variant="outline"
          onClick={() => navigate('/credentials')}
          className="mt-4"
        >
          Voltar para a listagem
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAtualizarStatus = async () => {
    await atualizarStatusPedido(id, status);
    carregarPedido();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/credentials')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: 'var(--color-text-secondary)', 
            backgroundColor: 'transparent', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          <ChevronLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} />
          <span>Voltar para a listagem</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Detalhes de pedidos</h1>
        <div className="flex space-x-4">
          <div style={{ position: 'relative' }}>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="input"
            >
              <option value="APROVADO">Ativo</option>
              <option value="REJEITADO">Inativo</option>
              <option value="PENDENTE">Em Análise</option>
            </select>
          </div>

          <Button 
            variant="primary"
            icon={<Edit style={{ width: '1rem', height: '1rem' }} />}
            onClick={handleAtualizarStatus}
          >
            Editar
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            <StatusBadge status={pedido.status_pedido} />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '51%',
                marginRight: '0.75rem'
              }}>
                <User style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Nome Completo</p>
                <p className="font-medium">{pedido.nome_pf}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <FileText style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">CPF</p>
                <p className="font-medium">
                  {pedido.cpf_pf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <FileText style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Documento</p>
                <p className="font-medium">{pedido.rg_pf || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <Mail style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Email</p>
                <p className="font-medium">{pedido.email_pf || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <Phone style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Telefone</p>
                <p className="font-medium">{pedido.fone_pf || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <MapPin style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Endereço</p>
                <p className="font-medium">{pedido.endereco_pf || 'Não informado'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Informações de pedidos</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary">Status Atual</p>
              <StatusBadge status={pedido.status_pedido} />
            </div>

            <div>
              <p className="text-sm text-secondary">ID</p>
              <p className="font-medium">{pedido.id}</p>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <Clock style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Data de Criação</p>
                <p className="font-medium">
                  {new Date(pedido.data_pedido).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div style={{
                backgroundColor: 'rgba(34, 104, 178, 0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem'
              }}>
                <Clock style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm text-secondary">Última Atualização</p>
                <p className="font-medium">
                  {new Date(pedido.updated_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialDetail;
