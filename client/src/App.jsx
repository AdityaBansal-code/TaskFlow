import React, { useState } from 'react';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { Dashboard } from './views/Dashboard';
import { Profile } from './views/Profile';
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
    const protectedPages = ['dashboard', 'profile'];
    if (protectedPages.includes(currentPage) && !isAuthenticated) {
      setCurrentPage('login');
      return <Login onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'login':
      default:
        return <Login onNavigate={setCurrentPage} />;
    }
  };


  return <div className="App">{renderPage()}</div>;
}

export default App;
