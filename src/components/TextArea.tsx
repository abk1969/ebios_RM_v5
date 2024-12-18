import React, { forwardRef } from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, error, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={`space-y-1 ${wrapperClassName}`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          {...props}
          ref={ref}
          id={id}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          rows={4}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';