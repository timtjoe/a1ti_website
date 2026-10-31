// src/components/common/IconButton.jsx
import React from 'react';
import styles from './IconButton.module.css';

export const IconButton = React.forwardRef(function IconButton({
  icon,
  label,
  className = '',
  size = 'md',
  variant = 'neutral',
  ...props
}, ref) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <span className="material-symbols-outlined">{icon}</span>;
    }
    return icon;
  };

  return (
    <button
      ref={ref}
      className={`${styles.iconButton} ${styles[size]} ${styles[variant]} ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {renderIcon()}
      {label ? <span className={styles.label}>{label}</span> : null}
    </button>
  );
});

export default IconButton;
