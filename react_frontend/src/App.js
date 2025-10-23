import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import AuthCard from './components/AuthCard';
import supabase from './lib/supabaseClient';

// PUBLIC_INTERFACE
function App() {
  const [theme] = useState('light'); // static theme for this app (Ocean Professional uses light background)
  const [session, setSession] = useState(null);

  // Apply data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Subscribe to Supabase auth changes and fetch current session
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      const { data } = await supabase.auth.getSession();
      if (isMounted) setSession(data.session);
    }
    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <div className="ocean-app">
      <div className="ocean-gradient" aria-hidden="true" />
      <Navbar />
      <main className="container">
        <AuthCard session={session} onSession={setSession} />
        <p className="footer-note" aria-live="polite">
          Secure authentication powered by Supabase.
        </p>
      </main>
    </div>
  );
}

export default App;
