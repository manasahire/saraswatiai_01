import React from 'react';

const Label = ({ htmlFor, children, ...props }) => {
  return (
    <label htmlFor={htmlFor} {...props} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
};

export { Label };
