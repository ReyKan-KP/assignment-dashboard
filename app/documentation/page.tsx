"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";
export default function DocumentationPage() {
  useEffect(() => {
    document.title = "Interactive Dashboard Documentation";
  }, []);
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
      <div className="max-w-4xl mx-auto p-6">
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
          <Link href="/signup" className="text-blue-500 dark:text-blue-300">
            signup
          </Link>
        </div>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Interactive Dashboard Documentation
        </h1>

        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Project Description
          </h2>
          <p>
            This project is a Full Stack Development Intern Assignment that
            involves creating an interactive dashboard application using{" "}
            <strong>Next.js</strong>, <strong>Recharts</strong>, and{" "}
            <strong>Supabase</strong>. The dashboard is designed to display
            various metrics, support user authentication, and provide data
            visualization capabilities. The application aims to offer a
            user-friendly interface while ensuring secure data management and
            real-time updates.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Objective
          </h2>
          <p>
            The main objective of this project is to develop a comprehensive
            dashboard that meets the following requirements:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Implement user authentication using Supabase Auth.</li>
            <li>
              Design and implement a dashboard with various widgets and charts
              using Recharts.
            </li>
            <li>Ensure responsive design for mobile compatibility.</li>
            <li>Deploy the application on Vercel.</li>
            <li>Provide clear documentation on setup and usage.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            How to Run This Next.js Project
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Clone the Repository:</strong>
              <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                <code>
                  $ git clone https://github.com/your-username/project-repo.git
                </code>
              </pre>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                Replace `your-username` with your actual GitHub username.
              </p>
            </li>
            <li>
              <strong>Install Dependencies:</strong>
              <pre className="bg-gray-800 text-white p-4 rounded-lg">
                <code>
                  $ cd project-repo <br />$ npm install
                </code>
              </pre>
            </li>
            <li>
              <strong>Setup Environment Variables:</strong>
              <p
                className="mb-4 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                Create a `.env.local` file in the root directory and add the
                following variables:
              </p>
              <pre className="bg-gray-800 text-white p-4 rounded-lg">
                <code>
                  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
                  <br />
                  NEXT_PUBLIC_SUPABASE_KEY=your-anon-key
                  <br />
                </code>
              </pre>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                Replace `your-supabase-url` and `your-anon-key` with actual
                values from your Supabase dashboard.
              </p>
            </li>
            <li>
              <strong>Running the Project Locally:</strong>
              <pre className="bg-gray-800 text-white p-4 rounded-lg">
                <code>$ npm run dev</code>
              </pre>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                This command starts the Next.js development server at{" "}
                <strong>http://localhost:3000</strong>.
              </p>
            </li>
            <li>
              <strong>Additional Commands:</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Build the project:</strong>{" "}
                  <pre className="inline bg-gray-800 text-white p-1 rounded-md">
                    npm build
                  </pre>
                </li>
                <li>
                  <strong>Run the production build:</strong>{" "}
                  <pre className="inline bg-gray-800 text-white p-1 rounded-md">
                    npm start
                  </pre>
                </li>
              </ul>
            </li>
            <li>
              <strong>Database Setup:</strong>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                Ensure your Supabase database is set up correctly with the
                necessary tables for user authentication and dashboard data.
                Refer to the Supabase documentation for guidance.
              </p>
            </li>
            <li>
              <strong>Deployment:</strong>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                To deploy the project on Vercel, push your code to a GitHub
                repository, then connect it to Vercel. Don’t forget to add the
                environment variables in Vercel as well.
              </p>
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              User Authentication: Secure login and registration using Supabase.
            </li>
            <li>
              Interactive Dashboard: Real-time data updates with charts and
              metrics.
            </li>
            <li>
              Customizable User Settings: Personalize user profiles and
              preferences.
            </li>
            <li>
              Data Management: Easily manage data entries and updates through
              the UI.
            </li>
            <li>
              Responsive Design: Fully functional on both desktop and mobile
              devices.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            How to Use
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Login/Register:</strong> Use the login form to access
              existing accounts or register for a new one.
            </li>
            <li>
              <strong>Dashboard:</strong> After logging in, you&apos;ll be
              directed to your interactive dashboard, where you can view your
              data.
            </li>
            <li>
              <strong>Manage Data:</strong> Use the provided options to add,
              edit, or delete data entries directly from the dashboard.
            </li>
            <li>
              <strong>Update Settings:</strong> Access your user settings to
              update your profile and preferences.
            </li>
            <li>
              <strong>Log Out:</strong> Click the logout button to securely end
              your session.
            </li>
          </ol>
        </section>
      </div>
    );
}
