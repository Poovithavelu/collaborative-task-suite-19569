import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minimal Next.js App",
  description: "Ultra-minimal Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <header className="px-4 py-3 border-b border-gray-200 flex items-center gap-4">
            <Link href="/" className="text-black font-semibold">
              CollabTask
            </Link>
            <nav className="text-sm text-gray-700 flex items-center gap-3">
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Register</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            </nav>
          </header>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
