// src/components/appbar/Navbar.jsx
import React from 'react';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';

export function AppBar() {
  return (
    <header>
      <TopBar />
      <BottomBar />
    </header>
  );
}

export default AppBar;