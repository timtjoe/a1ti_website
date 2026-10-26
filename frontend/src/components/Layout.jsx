// src/components/Layout.jsx
import { Outlet } from 'react-router';
import AppBar from '@/components/appbar/AppBar';
import { FAQ } from '@/components/common/FAQ';
import { SiteFooter } from '@/components/common/SiteFooter';

export default function Layout() {
  return (
    <div>
      <AppBar />
      <main>
        <Outlet />
      </main>
      <FAQ />
      <SiteFooter />
    </div>
  );
}