"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/auth";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Attempt to call a logout endpoint if backend provides it; ignore failures
        await fetch(`${getApiBaseUrl()}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch {
        // ignore
      } finally {
        if (mounted) router.replace("/login");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-700">Signing you out...</p>
    </main>
  );
}
