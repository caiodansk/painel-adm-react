import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          className: 'badge-success',
          label: 'Ativo',
        };
      case 'inactive':
        return {
          className: 'badge-error',
          label: 'Inativo',
        };
      case 'analysis':
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