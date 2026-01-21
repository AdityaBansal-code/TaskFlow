import React from 'react';

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-slate-50 p-3 sm:p-4 md:p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
            <div className="size-14 sm:size-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-sm">
              <svg className="size-8 sm:size-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-900 mb-1 sm:mb-2 text-balance">
            TaskFlow
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-medium text-pretty">
            Manage your tasks with elegance
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};
