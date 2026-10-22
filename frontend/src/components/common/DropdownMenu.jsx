// src/components/common/DropdownMenu.jsx
import React, { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_OUT = [0.0, 0.0, 0.2, 1];
const EASE_IN = [0.4, 0.0, 1, 1];

export const DropdownMenu = memo(function DropdownMenu({ 
  isOpen, 
  onClose, 
  items, 
  align = 'left', 
  className = '', 
  itemClassName = ''
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={menuRef}
          className={className}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            [align]: 0,
            zIndex: 1000,
            transformOrigin: align === 'right' ? 'top right' : 'top left',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.2, ease: EASE_OUT } 
          }}
          exit={{ 
            opacity: 0, 
            y: -8, 
            scale: 0.96,
            transition: { duration: 0.15, ease: EASE_IN } 
          }}
        >
          {items.map((subItem, subIdx) => (
            <Link 
              key={subIdx} 
              to={subItem.link || subItem.path} 
              className={itemClassName}
              onClick={onClose}
            >
              {subItem.icon && <i className="material-symbols-outlined">{subItem.icon}</i>}
              <span>{subItem.text || subItem.name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default DropdownMenu;