/* PUBLIC_INTERFACE */
/**
 * Authentication card supporting login and signup with Supabase.
 * - Client-side validation for email and password
 * - Loading, error, and success states
 * - Sign out and session display
 */
import React, { useEffect, useMemo, useState } from 'react';
import supabase from '../lib/supabaseClient';
import Input from './Input';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export default function AuthCard({ session, onSession }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const isLoggedIn = useMemo(() => Boolean(session?.user), [session]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  function validate() {
    const next = {};
    if (!email) next.email = 'Email is required';
    else if (!isValidEmail(email)) next.email = 'Enter a valid email address';

    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.user) {
          setMessage('Successfully signed in.');
          onSession?.(data.session ?? (await supabase.auth.getSession()).data.session);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Note: In hosted environments, set REACT_APP_SITE_URL if needed and map here
            // emailRedirectTo can be configured in Supabase dashboard for magic link confirmation
          }
        });
        if (error) throw error;
        if (data?.user) {
          setMessage('Signup successful. Check your inbox to confirm your email (if required).');
        }
      }
    } catch (err) {
      setMessage(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    setSubmitting(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setEmail('');
      setPassword('');
      setMessage('Signed out.');
      onSession?.(null);
    } catch (err) {
      setMessage(err?.message || 'Failed to sign out');
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="card" role="region" aria-label="Account">
        <div className="card-header">
          <h2 className="title">Welcome</h2>
          <p className="subtitle">You are signed in</p>
        </div>
        <div className="card-body">
          <div className="profile-box">
            <div className="avatar" aria-hidden="true">{session.user.email?.[0]?.toUpperCase() || 'U'}</div>
            <div className="profile-meta">
              <div className="profile-label">Email</div>
              <div className="profile-value">{session.user.email}</div>
            </div>
          </div>
          {message && <div className="banner success" role="status">{message}</div>}
          <button
            className="btn btn-secondary"
            onClick={handleSignOut}
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" role="form" aria-labelledby="auth-title">
      <div className="card-header">
        <h2 id="auth-title" className="title">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
        <p className="subtitle">
          {mode === 'login'
            ? 'Welcome back! Enter your credentials to continue.'
            : 'Create an account using your email and a password.'}
        </p>
      </div>

      {message && (
        <div
          className={`banner ${message.toLowerCase().includes('successfully') || message.toLowerCase().includes('check your inbox') ? 'success' : 'error'}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </div>
      )}

      <form className="card-body" onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          error={errors.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          error={errors.password}
          helperText={mode === 'signup' ? 'Use at least 6 characters.' : undefined}
        />

        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (mode === 'login' ? 'Signing in…' : 'Creating account…') : (mode === 'login' ? 'Sign In' : 'Sign Up')}
        </button>
      </form>

      <div className="card-footer">
        <p className="switch">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className="link"
                onClick={() => {
                  setMode('signup');
                  setErrors({});
                  setMessage('');
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="link"
                onClick={() => {
                  setMode('login');
                  setErrors({});
                  setMessage('');
                }}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
