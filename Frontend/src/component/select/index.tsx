"use client";

import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  name?: string;
  value: string;
  options: Option[];
  className?: string;
  status?: string;
  textColor?: boolean | string;
  onChange: (value: any) => void;
  helperText?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  className,
  status,
  textColor,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="w-full relative mb-4">
      {label && (
        <label
          htmlFor={name}
          className={`block ${textColor ? "text-black" : "text-gray-100"}`}
        >
          {label}
        </label>
      )}
      <div ref={selectRef} className="relative mt-1">
        <button
          type="button"
          className={`${className} block w-full p-2 border bg-transparent ${
            status === "danger" ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm placeholder:text-gray-300 ${
            textColor ? "text-black" : "text-white"
          } focus:outline-none focus:ring-[#216869] focus:border-[#216869]`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="flex items-center">
            <span className="ml-1 block truncate">
              {selectedOption?.label || "Select an option"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`relative hover:bg-[#216869] cursor-pointer hover:!text-white select-none py-2 pl-3 pr-9 text-gray-900 ${
                  selectedOption?.value === option.value
                    ? "bg-[#216869] !text-white"
                    : ""
                }`}
                role="option"
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate">{option.label}</span>
                </div>
                {selectedOption?.value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {helperText && (
        <div
          className={`text-sm mt-1 ${
            status === "danger" ? "text-red-500" : "text-gray-500"
          }`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
