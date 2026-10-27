// src/components/Layout.jsx
import { Outlet } from 'react-router';
import AppBar from '@/components/appbar/AppBar';
import { FAQ } from '@/components/common/FAQ';
import { DownloadConfirmation } from '@/components/common/DownloadConfirmation';
import { SiteFooter } from '@/components/common/SiteFooter';
import { useLocation } from 'react-router';

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div>
      <AppBar />
      <main>
        <Outlet />
      </main>
      {!['/admission/faq', '/faq'].includes(pathname) && <FAQ />}
      <SiteFooter />
      <DownloadConfirmation />
    </div>
  );
}