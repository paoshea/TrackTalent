interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
}

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  required,
  disabled,
  error,
  placeholder,
}: SelectProps<T>): JSX.Element {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
        required={required}
        className={`
          mt-1 block w-full rounded-md border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm
          ${disabled ? "bg-gray-100" : ""}
          ${error ? "border-red-300" : ""}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
