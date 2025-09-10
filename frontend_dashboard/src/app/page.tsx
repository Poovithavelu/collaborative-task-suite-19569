"use client";

import HomeClientRedirect from "./page.client";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <HomeClientRedirect />
      <div className="text-center space-y-4">
        <h1 className="text-black text-4xl font-semibold">
          CollabTask Frontend
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          Redirecting you to the appropriate page...
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/login"
            className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            Login
          </a>
          <a
            href="/register"
            className="rounded border border-blue-600 text-blue-700 px-4 py-2 hover:bg-blue-50"
          >
            Register
          </a>
          <a
            href="/dashboard"
            className="rounded border border-gray-300 text-gray-800 px-4 py-2 hover:bg-gray-50"
          >
            Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
