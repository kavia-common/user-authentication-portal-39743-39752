/* PUBLIC_INTERFACE */
/**
 * Minimal top navigation bar for branding.
 */
import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-brand">
        <span className="logo-dot" aria-hidden="true" />
        <span className="brand-text">Ocean Auth</span>
      </div>
    </nav>
  );
}
