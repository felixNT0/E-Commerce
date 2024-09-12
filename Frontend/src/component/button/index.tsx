"use client";

import React from "react";
import { FaSpinner } from "react-icons/fa"; // Importing the spinner icon

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<CustomButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${className} px-4 py-2 rounded-md w-full font-semibold text-white transition duration-300 ease-in-out focus:outline-none ${
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#216869] hover:bg-[#216869]/90"
      } flex items-center justify-center`}
    >
      {loading ? <FaSpinner className="animate-spin mr-2 my-1" /> : children}
    </button>
  );
};

export default Button;
