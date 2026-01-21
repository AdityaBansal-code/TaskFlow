import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export const Navbar = ({ onNavigate }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all hover:text-slate-700 group">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full border-2 border-white animate-pulse" />
        </button>
        
        <div className="h-8 w-px bg-slate-200" />
        
        <button 
          className="flex items-center gap-3 group cursor-pointer hover:bg-slate-50 rounded-xl p-2 pr-3 transition-all" 
          onClick={() => onNavigate?.('profile')}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Pro Member
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white group-hover:ring-primary-100 transition-all group-hover:scale-105">
            {user?.name?.[0] || 'U'}
          </div>
        </button>
      </div>
    </header>
  );
};

