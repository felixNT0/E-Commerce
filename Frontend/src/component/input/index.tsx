import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useRef,
  useState,
} from "react";
import { FaCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    name?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    helperText?: string;
    status?: string;
    textColor?: boolean | string;
    as?: "input" | "textarea";
  };

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  className,
  helperText,
  status,
  textColor,
  as = "input",
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const commonProps = {
    id: name,
    name,
    placeholder,
    className: `${className} mt-1 block w-full p-2 border bg-transparent ${
      status === "danger" ? "border-red-500" : "border-gray-300"
    } rounded-md shadow-sm placeholder:text-gray-300 ${
      textColor ? "text-black" : "text-white"
    } focus:outline-none focus:ring-[#216869] focus:border-[#216869']`,
    ...rest,
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCalendarClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="mb-4 w-full relative">
      {label && (
        <label htmlFor={name} className="block text-gray-100">
          {label}
        </label>
      )}
      {as === "input" ? (
        <div className="relative">
          <input
            ref={inputRef}
            onClick={type === "date" ? handleCalendarClick : undefined}
            type={type === "password" && showPassword ? "text" : type}
            {...commonProps}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                textColor ? "text-black" : "text-white"
              } focus:outline-none`}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-100" />
              ) : (
                <FaEye className="text-gray-100" />
              )}
            </button>
          )}
        </div>
      ) : (
        <textarea rows={5} {...commonProps} />
      )}
      {type === "date" && (
        <div
          className="absolute inset-y-0 right-0 pr-3 top-7 flex items-center cursor-pointer"
          onClick={handleCalendarClick}
        >
          <FaCalendarAlt className="text-gray-100" />
        </div>
      )}
      {helperText && (
        <div className="text-red-500 text-sm mt-1">{helperText}</div>
      )}
      <style jsx global>{`
        /* Hide the default calendar icon */
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Input;
