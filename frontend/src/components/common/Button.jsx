// src/components/common/Button.jsx
import React from 'react';
import styles from './Button.module.css';

export const Button = React.forwardRef(function Button({
  children,
  variant = 'primary', // primary, secondary, outline, success, error, warning
  size = 'md',         // sm, md, lg, xl
  light = false,       // boolean for outline buttons on dark backgrounds
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props
}, ref) {
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <i className="material-symbols-outlined">{icon}</i>;
    }
    return icon;
  };

  return (
    <button
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${light && variant === 'outline' ? styles.light : ''} 
        ${styles[size]} 
        ${fullWidth ? styles.fullWidth : ''} 
        ${className}
      `}
      ref={ref}
      {...props}
    >
      {leftIcon && <span className={styles.iconLeft}>{renderIcon(leftIcon)}</span>}
      <span className={styles.label}>{children}</span>
      {rightIcon && <span className={styles.iconRight}>{renderIcon(rightIcon)}</span>}
    </button>
  );
});

export default Button;