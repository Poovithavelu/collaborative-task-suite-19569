"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function HomeClientRedirect() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getCurrentUser();
      if (!mounted) return;
      if (res.ok) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  return null;
}
