import React, { useRef } from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required = false,
  className = '',
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative" onClick={handleClick}>
        <div className="w-full p-2 text-left border border-gray-300 rounded-lg bg-white">
          {value ? options.find(opt => opt.value === value)?.label : 'Select your role'}
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2">▼</span>
        </div>

        <select
          ref={selectRef}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="absolute inset-0 w-full h-full opacity-0"
        >
          <option value="" disabled>Select your role</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div className="mt-1 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
