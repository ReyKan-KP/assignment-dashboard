import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Menu } from "lucide-react";

interface NavbarProps {
  toggleMenu: () => void;
}

export default function Navbar({ toggleMenu }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  };

  return (
    <nav
      className="w-full p-4 flex justify-between items-center"
      style={{
        backgroundColor: "var(--navbar-bg)",
        borderBottom: "1px solid var(--navbar-border)",
      }}
    >
      <div className="flex items-center">
        <button className="lg:hidden mr-4" onClick={toggleMenu}>
          <Menu size={24} style={{ color: "var(--text-primary)" }} />
        </button>
        <span
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Dashboard
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <button onClick={handleLogout} className="btn-primary">
          Logout
        </button>
      </div>
    </nav>
  );
}
