// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
      <h1>Welcome to A1TI.COM</h1>
      <p style={{ color: '#4b5563', marginBottom: '2rem', lineHeight: '1.5' }}>
        Full-stack application integration layer connected to your School Management
        System backend.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link
          to="/users"
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
          }}
        >
          View Users
        </Link>
        <Link
          to="/dash"
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#4b5563',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
          }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
