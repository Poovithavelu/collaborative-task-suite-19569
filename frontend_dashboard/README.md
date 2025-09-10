This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Configure the backend API base URL:
   - Copy `.env.example` to `.env` and set `NEXT_PUBLIC_API_BASE_URL` to your FastAPI backend, e.g.:
     ```
     NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
     ```
   - The app uses cookie-based auth via `fetch(..., { credentials: "include" })`. Ensure your FastAPI server sets proper CORS and cookies (SameSite=None; Secure for cross-site HTTPS).

2. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```

3. Visit the following routes:
   - `/register` to create an account (POST /auth/register)
   - `/login` to sign in (POST /auth/login)
   - `/dashboard` protected route that fetches `/auth/me` and redirects to `/login` if unauthenticated

## Notes

- Make sure the FastAPI backend exposes:
  - `POST /auth/register` with JSON body `{ email, password, name? }`
  - `POST /auth/login` with JSON body `{ email, password }`
  - `GET /auth/me` returning the authenticated user
- CORS requirements on FastAPI should allow credentials and the frontend origin.

For general Next.js docs, see:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

