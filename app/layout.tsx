import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Interactive Dashboard",
  description: "Full-Stack Dashboard with Supabase and Recharts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
