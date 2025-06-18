import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { loginUser } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  

  

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
            <Logo />
            <h1 className="text-2xl font-bold text-primary mb-6">
              Painel Administrativo
            </h1>
          </div>
          
          {error && (
            <div className="error-message">
              <AlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}
          
          <form className="w-full space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-with-icon"
                  placeholder="exemplo@sesc.org.br"
                  required
                />
                <Mail className="input-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-with-icon"
                  placeholder="••••••••"
                  required
                />
                <Lock className="input-icon" />
              </div>
            </div>
            
            <Button
              type="button"
              variant="primary"
              fullWidth
              disabled={isLoading}
              onClick={() => loginUser(email, password, navigate)}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;