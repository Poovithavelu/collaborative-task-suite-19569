"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

type User = {
  id?: string | number;
  email?: string;
  name?: string;
  // Extend with additional known fields as necessary without using `any`
  // unknown properties will be ignored by this component
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getCurrentUser();
      if (!mounted) return;
      if (!res.ok) {
        // Redirect unauthenticated users to login
        router.replace("/login");
        return;
      }
      // Narrow the user object to expected keys
      const u = res.user as Partial<User>;
      setUser({
        id: u.id,
        email: u.email,
        name: u.name,
      });
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700">Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
        <nav className="text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </nav>
      </header>

      <section className="px-6 py-6">
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-black mb-2">Welcome</h2>
          <p className="text-gray-700 mb-4">
            You are authenticated. Below is your profile information.
          </p>

          <div className="grid gap-2 text-sm">
            <div>
              <span className="text-gray-600">Name: </span>
              <span className="text-black">
                {(user?.name as string) || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Email: </span>
              <span className="text-black">{user?.email || "—"}</span>
            </div>
            {user?.id !== undefined && (
              <div>
                <span className="text-gray-600">User ID: </span>
                <span className="text-black">{String(user.id)}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
