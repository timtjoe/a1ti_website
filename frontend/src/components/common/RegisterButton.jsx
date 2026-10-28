import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from './Button';
import styles from './RegisterButton.module.css';

export function RegisterButton({ children = 'Register Now', onChoose, ...buttonProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  const chooseOption = (path) => {
    onChoose?.();
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <Button
        {...buttonProps}
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0.01 } : undefined}
          >
            <motion.section
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="register-choice-title"
              tabIndex="-1"
              ref={dialogRef}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            >
              <button
                className={styles.close}
                type="button"
                aria-label="Close registration options"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
              <p className={styles.eyebrow}>Admissions</p>
              <h2 id="register-choice-title">How would you like to apply?</h2>
              <p>Choose the option that works best for you.</p>
              <div className={styles.options}>
                <button type="button" onClick={() => chooseOption('/register')}>
                  <span className="material-symbols-outlined" aria-hidden="true">computer</span>
                  <span><strong>Apply online</strong><small>Create an account, then submit and track your application.</small></span>
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </button>
                <button type="button" onClick={() => chooseOption('/about/campuses')}>
                  <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
                  <span><strong>Apply in person</strong><small>Visit the Admissions Office at an A-1 campus.</small></span>
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RegisterButton;
