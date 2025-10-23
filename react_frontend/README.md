# Supabase Auth React App (Ocean Professional)

This React app provides email/password authentication using Supabase with a clean, modern Ocean Professional theme.

## Features

- Email/password login and signup
- Client-side validation with accessible error messages
- Loading and success/error states
- Session persistence and auth state subscription
- Sign out and session display
- Accessible inputs and focus styles
- Ocean Professional theme (primary #2563EB, success/secondary #F59E0B, error #EF4444)

## Prerequisites

- Node.js 16+ and npm
- A Supabase project with Email/Password auth enabled

## Environment variables

Create a `.env` file in this folder (react_frontend) with:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

Notes:
- The variables must be prefixed with REACT_APP_ so React can access them.
- Do not commit secrets to version control.

## Supabase configuration

In Supabase Dashboard:
- Enable Email Auth: Authentication -> Providers -> Email -> Enable "Email" and "Password".
- Optionally configure email confirmation and redirect URLs as needed for your environment.

## Install and run

```
npm install
npm start
```

App starts at http://localhost:3000.

## Project structure

- src/lib/supabaseClient.js: Initializes Supabase client from env vars
- src/components/Input.js: Accessible input with error/helper text
- src/components/AuthCard.js: Login/Signup, validation, session handling, sign out
- src/components/Navbar.js: Minimal top navbar
- src/App.js: Renders Navbar, AuthCard, subscribes to auth state changes
- src/App.css, src/index.css: Ocean Professional theme styles

## Accessibility

- Semantic labels on inputs
- aria-invalid and aria-describedby for error mapping
- Focus-visible rings for keyboard navigation

## Troubleshooting

- If you see "Supabase configuration missing", ensure `.env` has REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY and restart the dev server.
- Ensure Email/Password auth is enabled in Supabase.
- Check browser console for network errors to the Supabase project URL.

## License

MIT
