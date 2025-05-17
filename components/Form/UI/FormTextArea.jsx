import React, { forwardRef } from "react";

const FormTextarea = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      required = false,
      className = "",
      rows = 4,
    },
    ref
  ) => {
    return (
      <div className={`mb-4 ${className}`}>
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
            ${
              error
                ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                : "input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
            }
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed dark:bg-gray-800"
                : "bg-white dark:bg-gray-800"
            }
            dark:text-white
          `}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
