import React from 'react';
import { Hexagon } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Hexagon className="logo-icon" strokeWidth={2} />
      <span className="logo-text">SESC</span>
      <span className="logo-admin">Admin</span>
    </div>
  );
};

export default Logo;