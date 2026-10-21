// src/components/appbar/BottomBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import logoSvg from '@/assets/logo.svg'; // Adjust path if your asset folder structure differs (e.g., '../../assets/logo.svg')
import styles from './BottomBar.module.css';

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
        {/* Left: SVG Logo from assets */}
        <div className={styles.logoWrapper}>
          <a href="/" className={styles.logoLink}>
            <img src={logoSvg} alt="A1TI Logo" className={styles.logoImage} />
          </a>
        </div>

        {/* Middle: Navigation Links & Dropdowns */}
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

        {/* Right: Registration & Get App Buttons */}
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
            leftIcon="download"
            onClick={() => window.location.href = '/download'}
          >
            Get App
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default BottomBar;