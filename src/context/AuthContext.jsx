import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // For demo purposes, we're simulating a login
    setIsLoading(true);
    
    // Mock authentication - in a real app this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@sesc.org.br' && password === 'password') {
          const user = {
            id: '1',
            name: 'Administrador SESC',
            email: email,
            role: 'admin',
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};