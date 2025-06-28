import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-1 border rounded-full"
    >
      {theme === "dark" ? <IoMoon /> : <IoMdSunny />}
    </button>
  );
}
