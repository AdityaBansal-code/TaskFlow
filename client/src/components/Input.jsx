import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={twMerge(
          "px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
});

Input.displayName = 'Input';
