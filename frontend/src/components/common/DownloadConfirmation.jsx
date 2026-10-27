import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './DownloadConfirmation.module.css';

export function DownloadConfirmation() {
  const [requestedDownload, setRequestedDownload] = useState(null);
  const [email, setEmail] = useState('');
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleDownload = (event) => {
      const link = event.target.closest?.('a');
      if (!link || link.dataset.confirmedDownload === 'true') return;
      const fileName = link.download || new URL(link.href, window.location.href).pathname.split('/').pop();
      if (!link.download && !/\.(pdf|docx?|xlsx?|pptx?|zip|txt|csv)$/i.test(fileName)) return;

      event.preventDefault();
      triggerRef.current = link;
      setRequestedDownload({
        href: link.href,
        filename: fileName,
      });
      setEmail('');
    };

    document.addEventListener('click', handleDownload, true);
    return () => document.removeEventListener('click', handleDownload, true);
  }, []);

  useEffect(() => {
    if (!requestedDownload) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleDialogKeys = (event) => {
      if (event.key === 'Escape') {
        setRequestedDownload(null);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled])');
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
    window.addEventListener('keydown', handleDialogKeys);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleDialogKeys);
      triggerRef.current?.focus();
    };
  }, [requestedDownload]);

  const confirmDownload = (event) => {
    event.preventDefault();
    if (!requestedDownload) return;

    const link = document.createElement('a');
    link.href = requestedDownload.href;
    link.download = requestedDownload.filename;
    link.dataset.confirmedDownload = 'true';
    document.body.append(link);
    link.click();
    link.remove();
    setRequestedDownload(null);
  };

  return (
    <AnimatePresence>
      {requestedDownload && (
        <motion.div
          className={styles.backdrop}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRequestedDownload(null);
          }}
        >
          <motion.section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-confirmation-title"
            aria-describedby="download-confirmation-description"
            tabIndex="-1"
            ref={dialogRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
          >
            <button
              className={styles.close}
              type="button"
              aria-label="Cancel download"
              onClick={() => setRequestedDownload(null)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
            <p className={styles.eyebrow}>Download confirmation</p>
            <h2 id="download-confirmation-title">Ready to download?</h2>
            <p id="download-confirmation-description">
              Confirm to download <strong>{requestedDownload.filename || 'this file'}</strong>.
              An email address is optional and will not be sent or stored.
            </p>
            <form onSubmit={confirmDownload}>
              <label htmlFor="download-contact">Email address (optional)</label>
              <input
                id="download-contact"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />
              <div className={styles.actions}>
                <button type="button" className={styles.cancel} onClick={() => setRequestedDownload(null)}>
                  Cancel
                </button>
                <button type="submit" className={styles.confirm}>
                  Confirm and download
                </button>
              </div>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DownloadConfirmation;
