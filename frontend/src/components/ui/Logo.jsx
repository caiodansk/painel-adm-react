import React from 'react';
import sescLogo from '../../assets/sesc.png';

const Logo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={sescLogo} alt="Logo SESC" style={{ width: '180px', height: 'auto' }} />
  </div>
);

export default Logo;
