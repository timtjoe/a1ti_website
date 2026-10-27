// src/components/appbar/BottomBar.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { DropdownMenu } from '@/components/common/DropdownMenu';
import styles from './AppBar.module.css';

const CARET_EASE_OUT = [0.0, 0.0, 0.2, 1];
const CARET_EASE_IN = [0.4, 0.0, 1, 1];
const MOBILE_QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/academic/courses' },
  { name: 'Contact', path: '/contact' },
];

export function BottomBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const menuConfig = [
    { name: 'Home', path: '/', dropdown: null },
    {
      name: 'About',
      path: '/about',
      dropdown: [
        { icon: 'history', text: 'History', link: '/about/history' },
        { icon: 'visibility', text: 'Mission', link: '/about/mission' },
        { icon: 'group', text: 'Leadership', link: '/about/leadership' },
        { icon: 'school', text: 'Alumni', link: '/about/alumni' },
        { icon: 'apartment', text: 'Campuses', link: '/about/campuses' },
      ],
    },
    {
      name: 'Academic',
      path: '/academic',
      dropdown: [
        { icon: 'menu_book', text: 'All Courses', link: '/academic/courses' },
        { icon: 'build', text: 'Technical Course', link: '/academic/courses?category=Technical' },
        { icon: 'psychology', text: 'Advanced Course', link: '/academic/courses?level=ADVANCED' },
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
        { icon: 'smart_display', text: 'Video examples', link: '/media/videos' },
        { icon: 'assessment', text: 'Reports', link: '/media/reports' },
        { icon: 'photo_library', text: 'Gallery', link: '/media/gallery' },
      ],
    },
    { name: 'Contact Us', path: '/contact', dropdown: null },
  ];

  const handleCloseDropdown = useCallback(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={styles.bottomBar} ref={navRef}>
      <div className={styles.container}>
        <div className={styles.mobileQuickLinks} role="group" aria-label="Quick links">
          {MOBILE_QUICK_LINKS.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                navigate(item.path);
                handleCloseDropdown();
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.mobileMenuButton}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-navigation-panel"
          onClick={() => {
            setIsMobileMenuOpen((open) => !open);
            setActiveDropdown(null);
          }}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <div
          id="site-navigation-panel"
          className={`${styles.mobilePanel} ${isMobileMenuOpen ? styles.mobilePanelOpen : ''}`}
        >
          <nav className={styles.navLinks} aria-label="Main navigation">
            {menuConfig.map((item, index) => {
              const hasDropdown = Boolean(item.dropdown);
              const isExpanded = activeDropdown === index;

              return (
                <div key={index} className={styles.navItemWrapper}>
                  <button
                    type="button"
                    className={`${styles.navLinkButton} ${isExpanded ? styles.activeNavLink : ''}`}
                    aria-expanded={hasDropdown ? isExpanded : undefined}
                    onClick={() => {
                      if (hasDropdown) {
                        setActiveDropdown(isExpanded ? null : index);
                      } else {
                        navigate(item.path);
                        handleCloseDropdown();
                      }
                    }}
                    onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
                  >
                    <span className={styles.directLink}>{item.name}</span>

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
          </nav>

          <div className={styles.rightActions}>
            <Button variant="secondary" size="md" onClick={() => { navigate('/register'); handleCloseDropdown(); }}>
              Register Now
            </Button>
            <Button variant="outline" light={true} size="md" className={styles.downloadBtn} onClick={() => { navigate('/download'); handleCloseDropdown(); }}>
              Download App
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomBar;