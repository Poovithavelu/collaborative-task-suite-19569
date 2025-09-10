"use client";

import Link from "next/link";

export default function LogoutLink({ className = "" }: { className?: string }) {
  return (
    <Link href="/logout" className={className}>
      Logout
    </Link>
  );
}
