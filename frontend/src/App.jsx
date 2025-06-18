import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CredentialList from './pages/CredentialList';
import CredentialDetail from './pages/CredentialDetail';
import LogsList from './pages/LogsList';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="credentials" element={<CredentialList />} />
          <Route path="credentials/:id" element={<CredentialDetail />} />
          <Route path="logs" element={<LogsList />} />
          <Route path="settings" element={<h1 className="text-2xl font-bold">Configurações</h1>} />
        </Route>

        {/* Corrige redirecionamento de rota inexistente */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
