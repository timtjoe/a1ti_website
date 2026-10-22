// src/components/appbar/BottomBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import styles from './AppBar.module.css';

export function BottomBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  const menuConfig = [
    { name: 'Home', path: '/', dropdown: null },
    {
      name: 'About',
      path: '/about',
      dropdown: [
        { icon: 'info', text: 'Overview', link: '/about/overview' },
        { icon: 'visibility', text: 'Mission & Vision', link: '/about/mission' },
        { icon: 'group', text: 'Leadership', link: '/about/leadership' },
      ],
    },
    {
      name: 'Academic',
      path: '/academic',
      dropdown: [
        { icon: 'menu_book', text: 'Programs', link: '/academic/programs' },
        { icon: 'apartment', text: 'Faculties', link: '/academic/faculties' },
        { icon: 'calendar_month', text: 'Academic Calendar', link: '/academic/calendar' },
      ],
    },
    {
      name: 'Admission',
      path: '/admission',
      dropdown: [
        { icon: 'how_to_reg', text: 'Apply Now', link: '/admission/apply' },
        { icon: 'payments', text: 'Tuition & Fees', link: '/admission/fees' },
        { icon: 'help', text: 'Requirements', link: '/admission/requirements' },
      ],
    },
    {
      name: 'Media',
      path: '/media',
      dropdown: [
        { icon: 'newspaper', text: 'News & Announcements', link: '/media/news' },
        { icon: 'photo_library', text: 'Photo Gallery', link: '/media/gallery' },
        { icon: 'event', text: 'Events', link: '/media/events' },
      ],
    },
  ];

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
        {/* Left: Navigation Links & Dropdowns */}
        <div className={styles.navLinks}>
          {menuConfig.map((item, index) => {
            const hasDropdown = Boolean(item.dropdown);
            const isExpanded = activeDropdown === index;

            return (
              <div key={index} className={styles.navItemWrapper}>
                <button
                  className={styles.navLinkButton}
                  onClick={() => hasDropdown && setActiveDropdown(isExpanded ? null : index)}
                  onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
                >
                  <a href={item.path} className={styles.directLink} onClick={(e) => hasDropdown && e.preventDefault()}>
                    {item.name}
                  </a>
                  {hasDropdown && (
                    <i className="material-symbols-outlined">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </i>
                  )}
                </button>

                {hasDropdown && isExpanded && (
                  <div className={styles.dropdownPanel}>
                    {item.dropdown.map((subItem, subIdx) => (
                      <a key={subIdx} href={subItem.link} className={styles.dropdownSubItem}>
                        <i className="material-symbols-outlined">{subItem.icon}</i>
                        <span>{subItem.text}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Registration & Download App Buttons */}
        <div className={styles.rightActions}>
          <Button
            variant="secondary"
            size="md"
            leftIcon="app_registration"
            onClick={() => window.location.href = '/register'}
          >
            Registration
          </Button>

          <Button
            variant="outline"
            light={true}
            size="md"
            className={styles.downloadBtn}
            onClick={() => window.location.href = '/download'}
          >
            {/* Google Play SVG Icon */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ marginRight: '6px' }}>
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.503 1.503 0 0 1-.36-.983V2.797c0-.373.13-.732.359-.983zm11.191 11.19l2.585 2.585-11.233 6.49a1.498 1.498 0 0 1-.689.167l9.337-9.242zm2.943-2.943l3.226 1.863a1.002 1.002 0 0 1 0 1.732l-3.226 1.863-2.92-2.92 2.92-2.938zM4.582 1.258l11.233 6.49-2.585 2.585L4.582 1.258z"/>
            </svg>
            Download App
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default BottomBar;