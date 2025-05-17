"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = "",
  placeholder = "Select an option",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Select
        value={value}
        onValueChange={(val) => onChange(id, val)}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          className={`
            w-full rounded-lg px-3 py-2 border transition-colors
            ${
              error
                ? "input-error-field focus-visible:ring-red-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-red-400 focus-visible:ring-[4px]"
                : "input-field focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-[3px]"
            }
            ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
          `}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="select-content mt-2">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="select-item"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
