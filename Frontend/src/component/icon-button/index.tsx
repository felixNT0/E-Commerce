"use client";

import React from "react";
import { FaSpinner } from "react-icons/fa"; // Importing the spinner icon

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  rounded?: boolean;
  className?: string;
}

const IconButton: React.FC<CustomButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  children,
  rounded,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${className} p-4 h-11 w-11 ${
        rounded ? "rounded-full" : "rounded"
      }  text-white font-bold text-xl transition duration-300 ease-in-out focus:outline-none ${
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#216869] hover:bg-[#216869]/90"
      } flex items-center justify-center`}
    >
      {loading ? <FaSpinner className="animate-spin mr-2" /> : children}
    </button>
  );
};

export default IconButton;
