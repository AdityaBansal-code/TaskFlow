import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const DashboardLayout = ({ children, onNavigate, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close drawer when navigating
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [currentPage]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex h-dvh bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          onNavigate={onNavigate}
          currentPage={currentPage}
        />
      </div>
      
      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden bg-slate-900/60 transition-opacity"
          onClick={() => setIsMobileDrawerOpen(false)}
        />
      )}
      
      {/* Mobile Drawer */}
      {isMobile && (
        <div 
          className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:hidden ${
            isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar 
            isOpen={true} 
            setIsOpen={() => setIsMobileDrawerOpen(false)}
            onNavigate={onNavigate}
            currentPage={currentPage}
            isMobileDrawer={true}
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar 
          onNavigate={onNavigate} 
          onToggleSidebar={handleSidebarToggle}
          showMenuButton={isMobile}
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
