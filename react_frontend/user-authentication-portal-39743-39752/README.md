# user-authentication-portal-39743-39752

This workspace contains a React frontend implementing Supabase email/password authentication with a modern Ocean Professional theme.

Contents:
- react_frontend: React app with Supabase authentication (login, signup, session handling)

Quick start:
1) cd react_frontend
2) Create a .env with:
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_KEY=your_supabase_anon_key
3) npm install
4) npm start

Supabase:
- Ensure Email/Password is enabled in Supabase Dashboard (Authentication -> Providers -> Email).
- Optionally configure redirect URLs if you require email confirmations.
