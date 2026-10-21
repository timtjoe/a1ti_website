// src/components/appbar/TopBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/common/Button';
import styles from './TopBar.module.css';

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkHours = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpen(hour >= 9 && hour < 17);
    };
    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!studentDropdownOpen) return;
    const handleScrollOrResize = () => {
      if (dropdownRef.current && containerRef.current) {
        requestAnimationFrame(() => {});
      }
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [studentDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStudentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const studentMenuItems = [
    { icon: 'dashboard', text: 'Student Portal', link: '/student/portal' },
    { icon: 'help', text: 'Portal FAQ', link: '/student/faq' },
    { icon: 'school', text: 'Alumni', link: '/student/alumni' },
  ];

  return (
    <div className={styles.topBar}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.hoursWrapper}>
            {isOpen ? (
              <span className={styles.statusBadge}>
                <i className="material-symbols-outlined">schedule</i>
                We are open: 9am-5pm
              </span>
            ) : (
              <span className={styles.closedBadge}>
                <i className="material-symbols-outlined">clock_loader_60</i>
                Closed
              </span>
            )}
          </div>

          {/* Single rectangular row with border and individual gutters for social/contact icons */}
          <div className={styles.socialBarRow}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.socialCell}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className={styles.socialCell}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.88-2.88c.37 0 .72.07 1.04.2V9.5a6.34 6.34 0 1 0 5.29 6.22V8.71a8.27 8.27 0 0 0 4.77 1.48V6.73a4.84 4.84 0 0 1-1.00-.04z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className={styles.socialCell}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M21.58 7.19a2.7 2.7 0 0 0-1.9-1.9C18 4.75 12 4.75 12 4.75s-6 0-7.68.54a2.7 2.7 0 0 0-1.9 1.9C1.88 8.87 1.88 12 1.88 12s0 3.13.54 4.81a2.7 2.7 0 0 0 1.9 1.9c1.68.54 7.68.54 7.68.54s6 0 7.68-.54a2.7 2.7 0 0 0 1.9-1.9c.54-1.68.54-4.81.54-4.81s0-3.13-.54-4.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
              </svg>
            </a>
            <a href="mailto:info@a1ti.com" aria-label="Email" className={styles.socialCell}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="tel:+1234567890" aria-label="Phone" className={styles.socialCell}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.actionsWrapper}>
          <Button variant="outline" size="sm" leftIcon="track_changes" onClick={() => window.location.href = '/track'}>
            Track Registration
          </Button>
          
          <Button variant="outline" size="sm" leftIcon="verified" onClick={() => window.location.href = '/verify'}>
            Verify Certificate
          </Button>

          <div className={styles.dropdownContainer} ref={containerRef}>
            <Button
              variant="outline"
              size="sm"
              leftIcon="school"
              rightIcon={studentDropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
              onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
            >
              For Student
            </Button>

            {studentDropdownOpen && (
              <div className={styles.dropdownMenu} ref={dropdownRef}>
                {studentMenuItems.map((item, index) => (
                  <a key={index} href={item.link} className={styles.dropdownItem}>
                    <i className="material-symbols-outlined">{item.icon}</i>
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;