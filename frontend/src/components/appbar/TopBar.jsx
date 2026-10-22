// src/components/appbar/TopBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/common/Button';
import logoSvg from '@/assets/logo_color.svg';
import styles from './AppBar.module.css';

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
        {/* Left: Logo */}
        <div className={styles.logoWrapper}>
          <a href="/" className={styles.logoLink}>
            <img src={logoSvg} alt="A1TI Logo" className={styles.logoImage} />
          </a>
        </div>

        {/* Middle: Hours Badge & Social Bar */}
        {/* <div className={styles.middleSection}>
          
          <div className={styles.socialBarRow}>
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
          </div>

        </div> */}

        {/* Right: Actions */}
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