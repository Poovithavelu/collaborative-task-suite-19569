"use client";

/**
 * Auth client utilities for interacting with the FastAPI backend.
 * Uses fetch with credentials to support cookie-based auth (recommended).
 * If backend returns JWT token, it can be stored as a cookie by server (Set-Cookie) or returned in JSON.
 */

export type AuthUser = {
  id?: string | number;
  email?: string;
  name?: string;
  // Extend with additional known fields as needed
};

// PUBLIC_INTERFACE
export function getApiBaseUrl(): string {
  /** Returns the configured API base URL from environment variables. */
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) {
    // Provide a helpful runtime error to guide configuration
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Please define it in your environment or .env file."
    );
  }
  return url.replace(/\/+$/, ""); // strip trailing slash
}

// PUBLIC_INTERFACE
export async function registerUser(data: {
  email: string;
  password: string;
  name?: string;
}): Promise<{ ok: boolean; message?: string }> {
  /** Registers a new user by POSTing to /auth/register. */
  const res = await fetch(`${getApiBaseUrl()}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Include credentials to allow cookie-based sessions
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let message = "Registration failed";
    try {
      const err = await res.json();
      message = (err as Record<string, unknown>)?.["detail"] as string ||
        (err as Record<string, unknown>)?.["message"] as string ||
        message;
    } catch {
      // ignore parse errors
    }
    return { ok: false, message };
  }
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<{ ok: boolean; message?: string }> {
  /** Logs in a user by POSTing to /auth/login. */
  const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let message = "Login failed";
    try {
      const err = await res.json();
      message = (err as Record<string, unknown>)?.["detail"] as string ||
        (err as Record<string, unknown>)?.["message"] as string ||
        message;
    } catch {
      // ignore parse errors
    }
    return { ok: false, message };
  }
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function getCurrentUser(): Promise<{
  ok: boolean;
  user?: AuthUser;
  message?: string;
  status?: number;
}> {
  /** Fetches the current authenticated user using /auth/me. */
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      // Avoid Next.js caching for auth
      cache: "no-store",
    });

    if (!res.ok) {
      let message = "Unauthorized";
      try {
        const err = await res.json();
        message = (err as Record<string, unknown>)?.["detail"] as string ||
          (err as Record<string, unknown>)?.["message"] as string ||
          message;
      } catch {
        // ignore parse errors
      }
      return { ok: false, message, status: res.status };
    }

    const userJson = (await res.json()) as unknown;
    // Best-effort narrowing of user shape
    const user: AuthUser = {};
    if (
      typeof userJson === "object" &&
      userJson !== null
    ) {
      const obj = userJson as Record<string, unknown>;
      if (typeof obj["id"] === "string" || typeof obj["id"] === "number") {
        user.id = obj["id"] as string | number;
      }
      if (typeof obj["email"] === "string") {
        user.email = obj["email"] as string;
      }
      if (typeof obj["name"] === "string") {
        user.name = obj["name"] as string;
      }
    }
    return { ok: true, user };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}
