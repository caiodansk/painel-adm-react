import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'APROVADO':
        return {
          className: 'badge-success',
          label: 'Ativo',
        };
      case 'REJEITADO':
        return {
          className: 'badge-error',
          label: 'Inativo',
        };
      case 'PENDENTE':
        return {
          className: 'badge-warning',
          label: 'Em Análise',
        };
      default:
        return {
          className: 'badge-warning',
          label: 'Desconhecido',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`badge ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;