import React, { useRef, useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  autoComplete,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle label click to focus input
  const handleLabelClick = () => {
    inputRef.current?.focus();
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle validation and blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsTouched(true);
    // Trigger validation immediately on blur
    if (required && !value.trim()) {
      e.target.setCustomValidity('This field is required');
    } else {
      e.target.setCustomValidity('');
    }
    onBlur?.(e);
  };

  // Handle validation on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (isTouched) {
      if (required && !e.target.value.trim()) {
        e.target.setCustomValidity('This field is required');
      } else {
        e.target.setCustomValidity('');
      }
    }
  };

  // Handle touch events with haptic feedback
  const handleTouchStart = () => {
    if (inputRef.current) {
      inputRef.current.style.transform = 'scale(0.98)';
      // Trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  };

  const handleTouchEnd = () => {
    if (inputRef.current) {
      inputRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2 touch-manipulation"
        onClick={handleLabelClick}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`
            w-full
            min-h-[48px]
            px-4
            py-3
            text-base
            border
            rounded-lg
            focus:outline-none
            focus:ring-4
            focus:ring-blue-500/20
            focus:border-blue-500
            transition-all
            duration-200
            ease-in-out
            active:scale-98
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isFocused ? 'border-blue-500' : ''}
            ${className}
          `}
          style={{
            // Prevent iOS zoom on focus
            fontSize: '16px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        />
        
        {error && isTouched && (
          <div 
            className="absolute -bottom-6 left-0 text-sm text-red-500 mt-1 bg-white/95 px-2 py-1 rounded-md shadow-sm"
            style={{
              transform: 'translateY(100%)',
              zIndex: 10
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

// Mobile Select Component
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
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  // Handle validation and blur
  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
    if (required && !value) {
      selectRef.current?.setCustomValidity('Please select an option');
    } else {
      selectRef.current?.setCustomValidity('');
    }
  };

  // Handle validation on change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    if (isTouched) {
      if (required && !e.target.value) {
        e.target.setCustomValidity('Please select an option');
      } else {
        e.target.setCustomValidity('');
      }
    }
    // Trigger haptic feedback on selection
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2 touch-manipulation"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          ref={selectRef}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`
            w-full
            min-h-[48px]
            px-4
            py-3
            text-base
            border
            rounded-lg
            focus:outline-none
            focus:ring-4
            focus:ring-blue-500/20
            focus:border-blue-500
            transition-all
            duration-200
            ease-in-out
            appearance-none
            bg-white
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isFocused ? 'border-blue-500' : ''}
            ${!value ? 'text-gray-500' : 'text-gray-900'}
          `}
          style={{ 
            fontSize: '16px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="" disabled>Select your role</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && isTouched && (
          <div 
            className="absolute -bottom-6 left-0 text-sm text-red-500 mt-1 bg-white/95 px-2 py-1 rounded-md shadow-sm"
            style={{
              transform: 'translateY(100%)',
              zIndex: 10
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
