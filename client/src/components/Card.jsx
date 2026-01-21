import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, title }) => {
  return (
    <div className={twMerge("bg-white p-6 rounded-xl shadow-sm border border-gray-100", className)}>
      {title && <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>}
      {children}
    </div>
  );
};
