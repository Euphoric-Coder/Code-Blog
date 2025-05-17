import React, { useState, useRef, useEffect } from "react";

const SingleSelect = ({
  id,
  label,
  selectedOption,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  className = "",
  placeholder = "Select an item...",
  allowCustom = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const selectedLabel =
    options.find((opt) => opt.value === selectedOption)?.label ||
    selectedOption ||
    "";

  useEffect(() => {
    setInputValue(selectedLabel);
  }, [selectedOption, options]);

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/gi, ""); // removes dots, spaces, etc.

  const filteredOptions = options.filter((option) =>
    normalize(option.label).includes(normalize(inputValue))
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleOptionSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) setIsOpen(true);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const highlighted = filteredOptions[highlightedIndex];
      if (highlighted) {
        handleOptionSelect(highlighted.value);
      } else if (allowCustom && inputValue.trim()) {
        handleOptionSelect(inputValue);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setInputValue(selectedLabel);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setInputValue(selectedLabel);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedLabel]);

  return (
    <div className={`mb-4 ${className}`} ref={containerRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <div
          className={`
            flex items-center gap-2 px-2 border rounded-3xl focus-within:ring-2 transition-colors
            ${
              error
                ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-200 dark:focus-within:ring-red-700/30"
                : "input-field"
            }
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed dark:bg-gray-800"
                : "bg-white dark:bg-gray-800"
            }
          `}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            id={id}
            type="text"
            className="flex-grow bg-transparent border-none outline-none p-1 text-gray-700 dark:text-white"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsOpen(true);
              setHighlightedIndex(0);
            }}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 mt-3 select-content max-h-60 overflow-auto z-50 bg-white dark:bg-gray-800 border rounded-md shadow-lg dark:border-gray-700">
            {filteredOptions.length > 0 ? (
              <ul className="py-2">
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`multiselect-item px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 ${
                      highlightedIndex === index
                        ? "bg-indigo-100 dark:bg-indigo-900"
                        : "hover:bg-indigo-100 dark:hover:bg-indigo-900"
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
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
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default SingleSelect;
