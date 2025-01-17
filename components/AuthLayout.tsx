"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);

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
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        <br />
        Welcome to Interactive Dashboard &nbsp;&nbsp;
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={darkMode ? "dark" : "light"}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-700" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </h1>

      <div className="flex justify-around mb-6">
        <Link href="/api-docs" className="text-blue-500 dark:text-blue-300">
          API Docs
        </Link>
        <Link
          href="/documentation"
          className="text-blue-500 dark:text-blue-300"
        >
          Documentation
        </Link>
        <Link href="/login" className="text-blue-500 dark:text-blue-300">
          Login
        </Link>
        <Link
          href="/signup"
          className="text-blue-500 dark:text-blue-300"
        >
          signup
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-2xl rounded-xl transition-colors duration-500"
        >
          <div className="flex justify-between items-center mb-6">
            <center>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white  text-center">
                {title}
              </h3>
            </center>
          </div>
          {children}
        </motion.div>
      </div>
    </>
  );
}
