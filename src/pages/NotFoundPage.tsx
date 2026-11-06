import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Backpack, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '96px 20px', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: '540px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          backgroundColor: 'var(--color-cream-card)',
          padding: '48px 32px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-cream-subtle)',
            color: 'var(--color-forest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Compass size={40} aria-hidden="true" />
        </div>

        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-olive)',
          }}
        >
          404 — Off The Trail
        </span>

        <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>You seem to have strayed off the path.</h1>

        <p style={{ color: 'var(--color-charcoal-light)', lineHeight: 1.6, marginBottom: '8px' }}>
          The expedition page or coordinate you requested does not exist or has moved. Let's get you back on track to known landmarks.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} aria-hidden="true" />
            <span>Return to Home</span>
          </Link>
          <Link to="/adventures" className="btn btn-secondary">
            <span>Explore Adventures</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/my-kit" className="btn btn-ghost">
            <Backpack size={16} aria-hidden="true" />
            <span>My Adventure Kit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

