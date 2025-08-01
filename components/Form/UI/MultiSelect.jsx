"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MultiSelect = ({
  id,
  label,
  selectedOptions,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  className = "",
  placeholder = "Add items...",
  allowCustom = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(
      (option) =>
        !selectedOptions.includes(option.value) &&
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options, selectedOptions]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (value) => {
    onChange([...selectedOptions, value]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleRemoveOption = (valueToRemove) => {
    onChange(selectedOptions.filter((value) => value !== valueToRemove));
  };

  const handleClearAll = () => {
    onChange([]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      console.log("Pressed the enter button");
      e.preventDefault();
      const existing = options.find(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );
      if (existing) {
        if (!selectedOptions.includes(existing.value)) {
          console.log("Don't exist the same value");
          handleOptionSelect(existing.value);
        }
      } else if (allowCustom) {
        if (!selectedOptions.includes(inputValue.trim())) {
          handleOptionSelect(inputValue.trim());
        } else {
          toast.error("Please Avoid Entering Duplicate Value");
        }
      }
      setInputValue("");
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedOptions.length > 0
    ) {
      handleRemoveOption(selectedOptions[selectedOptions.length - 1]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`mb-4 ${className}`} ref={containerRef}>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="text">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {/* Right: Fixed Clear Button */}
        {selectedOptions.length > 0 && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="flex md:hidden del3"
            title="Clear all"
          >
            Clear
          </button>
        )}
      </div>
      <div
        className={`
         mt-1 w-full relative
          ${
            error
              ? "multiinput-error-field"
              : "input-field focus-within:ring-blue-500 dark:focus-within:ring-offset-gray-800 dark:focus-within:ring-blue-400 focus-within:ring-[4px]"
          }
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed dark:bg-gray-800"
              : "bg-white dark:bg-gray-800"
          }
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Left: Wrapping content */}
        <div className="flex flex-wrap gap-2 flex-grow p-2 pr-20">
          {" "}
          {/* reserve space for button */}
          {selectedOptions.map((value) => {
            const option = options.find((o) => o.value === value);
            const label = option ? option.label : value;

            return (
              <Badge
                key={value}
                className="flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-2 py-1 rounded-3xl text-sm dark:bg-indigo-900 hover:dark:bg-indigo-700 dark:text-indigo-100 cursor-pointer"
              >
                <span>{label}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(value);
                    }}
                    className="text-indigo-500 hover:text-red-600 focus:outline-none dark:text-indigo-300 dark:hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </Badge>
            );
          })}
          <input
            ref={inputRef}
            id={id}
            type="text"
            className="flex-grow bg-transparent border-none outline-none p-1 text-gray-700 dark:text-white min-w-[150px]"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            disabled={disabled}
          />
        </div>

        {/* Right: Fixed Clear Button */}
        {selectedOptions.length > 0 && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 del3"
            title="Clear all"
          >
            Clear
          </button>
        )}
      </div>

      {isOpen && !disabled && (
        <div className="mt-3 select-content max-h-60 overflow-auto">
          {/* <div className="mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg z-10 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"> */}
          {filteredOptions.length > 0 ? (
            <ul className="py-2">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="multiselect-item"
                  // className="px-3 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-200"
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
              {allowCustom
                ? "Press Enter to add this as a new item"
                : "No options available"}
            </div>
          )}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default MultiSelect;
