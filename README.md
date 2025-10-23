# user-authentication-portal-39743-39752

IMPORTANT: Supabase setup checklist
1) Create/find Supabase Project URL and anon key (Dashboard -> Settings -> API)
2) Enable Email/Password (Authentication -> Providers -> Email)
3) Configure URL allowlist (Authentication -> URL Configuration):
   - Site URL: http://localhost:3000/
   - Redirects:
     * http://localhost:3000/
     * http://localhost:3000/*
     * http://localhost:3000/auth/callback
     * http://localhost:3000/auth/reset-password
4) In react_frontend/.env set:
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_KEY=your_supabase_anon_key
5) Restart the dev server after env changes