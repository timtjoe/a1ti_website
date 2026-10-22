// src/components/appbar/BottomBar.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { DropdownMenu } from '@/components/common/DropdownMenu';
import styles from './AppBar.module.css';

const CARET_EASE_OUT = [0.0, 0.0, 0.2, 1];
const CARET_EASE_IN = [0.4, 0.0, 1, 1];

export function BottomBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const menuConfig = [
    { name: 'Home', path: '/', dropdown: null },
    {
      name: 'About',
      path: '/about',
      dropdown: [
        { icon: 'info', text: 'About Us', link: '/about/us' },
        { icon: 'visibility', text: 'Mission', link: '/about/mission' },
        { icon: 'group', text: 'Leadership', link: '/about/leadership' },
        { icon: 'history', text: 'History', link: '/about/history' },
        { icon: 'school', text: 'Alumni', link: '/about/alumni' },
        { icon: 'apartment', text: 'Campuses', link: '/about/campuses' },
      ],
    },
    {
      name: 'Academic',
      path: '/academic',
      dropdown: [
        { icon: 'menu_book', text: 'All Courses', link: '/academic/courses' },
        { icon: 'build', text: 'Technical Course', link: '/academic/technical' },
        { icon: 'psychology', text: 'Advance Course', link: '/academic/advance' },
        { icon: 'supervisor_account', text: 'Instructors', link: '/academic/instructors' },
      ],
    },
    {
      name: 'Admission',
      path: '/admission',
      dropdown: [
        { icon: 'how_to_reg', text: 'How to Apply', link: '/admission/apply' },
        { icon: 'payments', text: 'Fees and Payments', link: '/admission/fees' },
        { icon: 'help', text: 'FAQ', link: '/admission/faq' },
        { icon: 'rule', text: 'Entry Requirement', link: '/admission/requirements' },
        { icon: 'calendar_month', text: 'Intake Calendar', link: '/admission/calendar' },
        { icon: 'app_registration', text: 'Register Online', link: '/admission/register' },
      ],
    },
    {
      name: 'Media',
      path: '/media',
      dropdown: [
        { icon: 'newspaper', text: 'News', link: '/media/news' },
        { icon: 'assessment', text: 'Reports', link: '/media/reports' },
        { icon: 'photo_library', text: 'Gallery', link: '/media/gallery' },
      ],
    },
    { name: 'Contact Us', path: '/contact', dropdown: null },
  ];

  const handleCloseDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={styles.bottomBar} ref={navRef}>
      <div className={styles.container}>
        {/* Left Navigation Links & Animated Carets */}
        <div className={styles.navLinks}>
          {menuConfig.map((item, index) => {
            const hasDropdown = Boolean(item.dropdown);
            const isExpanded = activeDropdown === index;

            return (
              <div key={index} className={styles.navItemWrapper}>
                <button
                  className={`${styles.navLinkButton} ${isExpanded ? styles.activeNavLink : ''}`}
                  onClick={() => {
                    if (hasDropdown) {
                      setActiveDropdown(isExpanded ? null : index);
                    } else {
                      navigate(item.path);
                    }
                  }}
                  onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
                >
                  <Link to={item.path} className={styles.directLink} onClick={(e) => hasDropdown && e.preventDefault()}>
                    {item.name}
                  </Link>

                  {hasDropdown && (
                    <motion.i
                      className="material-symbols-outlined"
                      initial={false}
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{
                        duration: isExpanded ? 0.2 : 0.15,
                        ease: isExpanded ? CARET_EASE_OUT : CARET_EASE_IN,
                      }}
                      style={{ display: 'inline-block', willChange: 'transform' }}
                    >
                      expand_more
                    </motion.i>
                  )}
                </button>

                {hasDropdown && (
                  <DropdownMenu
                    isOpen={isExpanded}
                    onClose={handleCloseDropdown}
                    items={item.dropdown}
                    align="left"
                    className={styles.dropdownPanel}
                    itemClassName={styles.dropdownSubItem}
                    caretOffset="20px"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className={styles.rightActions}>
          <Button variant="secondary" size="md" onClick={() => navigate('/register')}>
            Register Now
          </Button>
          <Button variant="outline" light={true} size="md" className={styles.downloadBtn} onClick={() => navigate('/download')}>
            Download App
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default BottomBar;