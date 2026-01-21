import React from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle } from 'lucide-react';

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            error && "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/10 pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
