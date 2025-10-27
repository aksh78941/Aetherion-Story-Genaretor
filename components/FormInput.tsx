import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, name, onChange, readOnly = false, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-semibold">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={name}
          name={name}
          rows={3}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className="block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out resize-none"
        />
      </div>
    </div>
  );
};

export default FormInput;