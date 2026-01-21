import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import useAuthStore from './store/authStore';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Auto-redirect to dashboard if authenticated
  React.useEffect(() => {
    if (isAuthenticated && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const renderPage = () => {
    // Protected route - redirect to login if not authenticated
    if (currentPage === 'dashboard' && !isAuthenticated) {
      setCurrentPage('login');
      return <Login onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'login':
      default:
        return <Login onNavigate={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
