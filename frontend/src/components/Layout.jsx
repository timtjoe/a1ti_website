// src/components/Layout.jsx
import { Outlet, Link } from 'react-router';

export default function Layout() {
  return (
    <div>
      <header
        style={{
          padding: '1rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          gap: '1.5rem',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/dash">Dashboard</Link>
      </header>
      <main style={{ padding: '1.5rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
