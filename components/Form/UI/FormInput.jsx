import React, { forwardRef } from "react";

const FormInput = forwardRef(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      required = false,
      min,
      max,
      className = "",
      readOnly = false,
      icon,
    },
    ref
  ) => {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative w-full">
          {icon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            min={min}
            max={max}
            className={`
              w-full rounded-xl border-[2px] shadow-lg
              ${icon ? "pl-10 pr-3 py-2" : "px-3 py-2"}
              ${
                error
                  ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                  : "input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
              }
              text-gray-800 dark:text-gray-200
              placeholder-gray-400 dark:placeholder-gray-500
              transition-all duration-500 focus:outline-none
              ${disabled || readOnly ? "cursor-not-allowed" : ""}
            `}
          />
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
