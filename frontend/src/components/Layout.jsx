// src/components/Layout.jsx
import { Outlet } from 'react-router';
import AppBar from '@/components/appbar/AppBar';

export default function Layout() {
  return (
    <div>
      <AppBar />
      <main style={{ padding: '1.5rem' }}>
        <Outlet />
      </main>
    </div>
  );
}