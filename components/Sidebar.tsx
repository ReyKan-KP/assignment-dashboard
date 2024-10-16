import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={`w-64 p-4 transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static top-0 left-0 h-full z-10`}
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition-colors duration-300"
              style={{ color: "var(--sidebar-text)" }}
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/table"
              className="hover:text-blue-600 transition-colors duration-300"
              style={{ color: "var(--sidebar-text)" }}
            >
              Table
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
