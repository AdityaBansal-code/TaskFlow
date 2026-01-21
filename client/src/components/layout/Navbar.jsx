import React from 'react';
import { Menu } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export const Navbar = ({ onNavigate, onToggleSidebar, showMenuButton }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="size-5" />
          </button>
        )}
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
      </div>

      <button
        className="flex items-center gap-2 sm:gap-3 hover:bg-slate-50 rounded-xl p-2 pr-2 sm:pr-3 transition-colors"
        onClick={() => onNavigate?.('profile')}
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900 leading-tight">
            {user?.name || 'User'}
          </p>
        </div>
        <div className="size-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold shrink-0">
          {user?.name?.[0] || 'U'}
        </div>
      </button>
    </header>
  );
};

