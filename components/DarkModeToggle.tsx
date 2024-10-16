import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div
      onClick={toggleDarkMode}
      className={`relative w-16 h-8 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer flex items-center justify-${
        darkMode ? "end" : "start"
      }`}
    >
      <div className="absolute inset-0 flex justify-between px-2 items-center">
        <FaSun className="text-yellow-500" />
        <FaMoon className="text-gray-600" />
      </div>
      <div
        className={`w-7 h-7 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform ${
          darkMode ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </div>
  );
}
