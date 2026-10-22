// src/components/appbar/TopBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/common/Button';
import { DropdownMenu } from '@/components/common/DropdownMenu';
import logoSvg from '@/assets/logo_color.svg';
import styles from './AppBar.module.css';

export function TopBar() {
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  useEffect(() => {
    const checkFinanceHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hour = now.getHours();

      // Open Mon-Sat (1 to 6) between 9am (9) and 5pm (17)
      const isOpenDay = day >= 1 && day <= 6;
      const isOpenHour = hour >= 9 && hour < 17;
      setIsFinanceOpen(isOpenDay && isOpenHour);
    };

    checkFinanceHours();
    const interval = setInterval(checkFinanceHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const studentMenuItems = [
    { icon: 'dashboard', text: 'Student Portal', link: '/student/portal' },
    { icon: 'school', text: 'Alumni Program', link: '/student/alumni' },
    { icon: 'help', text: 'How to use the Portal', link: '/student/faq' },
    { icon: 'support', text: 'General Support', link: '/student/support' },
  ];

  return (
    <div className={styles.topBar}>
      <div className={styles.container}>
        {/* Left: Logo */}
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoSvg} alt="A1TI Logo" className={styles.logoImage} />
          </Link>
        </div>

        {/* Middle: Finance Office Open Hours */}
        <div className={styles.middleSection}>
          <div className={styles.hoursWrapper}>
            {isFinanceOpen ? (
              <span className={styles.statusBadge}>
                <i className="material-symbols-outlined">schedule</i>
                Finance Office: Mon–Sat 9am–5pm (Open)
              </span>
            ) : (
              <span className={styles.closedBadge}>
                <i className="material-symbols-outlined">clock_loader_60</i>
                Finance Office: Mon–Sat 9am–5pm (Closed)
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className={styles.actionsWrapper}>
          <Button variant="outline" size="sm" leftIcon="track_changes" onClick={() => window.location.href = '/track'}>
            Track Registration
          </Button>
          <Button variant="outline" size="sm" leftIcon="verified" onClick={() => window.location.href = '/verify'}>
            Verify Certificate
          </Button>

          <div className={styles.dropdownContainer}>
            <Button
              variant="outline"
              size="sm"
              leftIcon="school"
              rightIcon={studentDropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
              onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
            >
              For Student
            </Button>

            <DropdownMenu
              isOpen={studentDropdownOpen}
              onClose={() => setStudentDropdownOpen(false)}
              items={studentMenuItems}
              align="right"
              className={styles.dropdownMenu}
              itemClassName={styles.dropdownItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;