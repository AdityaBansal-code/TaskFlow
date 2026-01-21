import React from 'react';
import { cn } from '../../utils/cn';
import { 
  LayoutDashboard, 
  CheckSquare, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const NavItem = ({ icon: Icon, label, isActive, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-3 py-2.5 my-1 rounded-xl transition-all duration-200 group",
      isActive 
        ? "bg-primary-50 text-primary-600 font-semibold" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
    {!collapsed && <span className="text-sm truncate">{label}</span>}
    {isActive && !collapsed && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />
    )}
  </button>
);

export const Sidebar = ({ isOpen, setIsOpen, onNavigate, currentPage }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-sm",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-6 flex items-center justify-between border-b border-slate-100">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-all hover:scale-110"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 px-3 mt-6 space-y-1">
        <NavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          isActive={currentPage === 'dashboard'} 
          onClick={() => onNavigate('dashboard')}
          collapsed={!isOpen} 
        />
        <NavItem 
          icon={User} 
          label="Profile" 
          isActive={currentPage === 'profile'}
          onClick={() => onNavigate('profile')}
          collapsed={!isOpen} 
        />
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        {isOpen && user && (
          <div className="mb-3 p-3 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'email@example.com'}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            logout();
            onNavigate('login');
          }}
          className={cn(
            "flex items-center w-full px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 font-medium group",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
          {isOpen && <span className="ml-3 text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

