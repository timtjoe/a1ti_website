import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/common/Button';
import portraitJordan from '@/assets/img_001.jpeg';
import portraitTaylor from '@/assets/img_012.jpeg';
import portraitCasey from '@/assets/img_005.jpeg';
import mockCertificates from '@/data/mockCertificates.json';
import styles from './CertificateVerificationPage.module.css';

const CERTIFICATE_PORTRAITS = {
  'A1-DEMO-2024-001': portraitJordan,
  'A1-DEMO-2023-002': portraitTaylor,
  'A1-DEMO-2025-003': portraitCasey,
};

function getScanError(error) {
  if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
    return 'Camera access was denied. Allow camera access or enter the certificate number manually.';
  }
  if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
    return 'No suitable camera was found. Enter the certificate number manually.';
  }
  return error.message || 'The barcode could not be read. Try another image or enter the number manually.';
}

function getCertificateNumber(value) {
  const rawValue = value.trim();
  try {
    const url = new URL(rawValue);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      const parameter = ['certificate', 'certificateNumber', 'id']
        .map((key) => url.searchParams.get(key))
        .find(Boolean);
      return (parameter || url.pathname.split('/').filter(Boolean).pop() || rawValue).trim().toUpperCase();
    }
  } catch {
    return rawValue.toUpperCase();
  }
  return rawValue.toUpperCase();
}

export default function CertificateVerificationPage() {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [scanError, setScanError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isStartingScanner, setIsStartingScanner] = useState(false);
  const [scannerRequested, setScannerRequested] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const readerRef = useRef(null);
  const scannerControlsRef = useRef(null);
  const hasHandledScanRef = useRef(false);
  const scannerRequestIdRef = useRef(0);
  const certificateInputRef = useRef(null);

  const stopScanner = useCallback(() => {
    scannerRequestIdRef.current += 1;
    hasHandledScanRef.current = true;
    scannerControlsRef.current?.stop();
    scannerControlsRef.current = null;
    readerRef.current = null;
    setIsScanning(false);
    setIsStartingScanner(false);
    setScannerRequested(false);
  }, []);

  const lookupCertificate = useCallback((number) => {
    const normalizedNumber = getCertificateNumber(number);
    const certificate = normalizedNumber
      ? mockCertificates.find((item) => item.certificateNumber === normalizedNumber)
      : null;
    setCertificateNumber(normalizedNumber);
    setHasSearched(Boolean(normalizedNumber));
    setResult(certificate ? { ...certificate, image: CERTIFICATE_PORTRAITS[certificate.certificateNumber] } : null);
    setScanError('');
  }, []);

  useEffect(() => {
    if (!scannerRequested || !readerRef.current) return undefined;

    const reader = readerRef.current;
    let isActive = true;

    reader.decodeFromConstraints(
      { audio: false, video: { facingMode: { ideal: 'environment' } } },
      videoRef.current,
      (decodedResult, _error, controls) => {
        if (!decodedResult || !isActive || hasHandledScanRef.current) return;
        hasHandledScanRef.current = true;
        controls?.stop();
        scannerControlsRef.current?.stop();
        scannerControlsRef.current = null;
        readerRef.current = null;
        setIsScanning(false);
        setIsStartingScanner(false);
        setScannerRequested(false);
        lookupCertificate(decodedResult.getText());
        certificateInputRef.current?.focus();
      },
    ).then((controls) => {
      if (!isActive || hasHandledScanRef.current) {
        controls.stop();
        return;
      }
      scannerControlsRef.current = controls;
      setIsScanning(true);
      setIsStartingScanner(false);
    }).catch((error) => {
      if (!isActive) return;
      isActive = false;
      readerRef.current = null;
      scannerControlsRef.current = null;
      setIsScanning(false);
      setIsStartingScanner(false);
      setScannerRequested(false);
      setScanError(getScanError(error));
    });

    return () => {
      isActive = false;
      scannerControlsRef.current?.stop();
      scannerControlsRef.current = null;
      if (readerRef.current === reader) readerRef.current = null;
    };
  }, [lookupCertificate, scannerRequested]);

  const handleSubmit = (event) => {
    event.preventDefault();
    stopScanner();
    lookupCertificate(certificateNumber);
  };

  const handleStartScanner = async () => {
    const requestId = scannerRequestIdRef.current + 1;
    scannerRequestIdRef.current = requestId;
    setScanError('');
    setIsStartingScanner(true);
    try {
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      if (scannerRequestIdRef.current !== requestId) return;
      readerRef.current = new BrowserMultiFormatReader();
      hasHandledScanRef.current = false;
      setScannerRequested(true);
    } catch (error) {
      if (scannerRequestIdRef.current !== requestId) return;
      setScanError(getScanError(error));
      setIsStartingScanner(false);
    }
  };

  const handleImageImport = async (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    stopScanner();
    setScanError('');
    setIsImporting(true);
    const imageUrl = URL.createObjectURL(file);
    let reader;
    try {
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      reader = new BrowserMultiFormatReader();
      const decodedResult = await reader.decodeFromImageUrl(imageUrl);
      lookupCertificate(decodedResult.getText());
    } catch (error) {
      setScanError(error.name === 'NotFoundException'
        ? 'No barcode or QR code was found in that image. Try a clearer image or enter the number manually.'
        : getScanError(error));
    } finally {
      URL.revokeObjectURL(imageUrl);
      setIsImporting(false);
    }
  };

  return (
    <div className={styles.verificationPage}>
      <p className={styles.demoNotice}>
        <span className="material-symbols-outlined" aria-hidden="true">science</span>
        This lookup uses sample certificate records only. Results are not official verification by A-1.
      </p>

      <section className={styles.verificationCard} aria-labelledby="certificate-lookup-title">
        <div className={styles.verificationIntro}>
          <span className={styles.verificationIcon} aria-hidden="true">
            <span className="material-symbols-outlined">verified_user</span>
          </span>
          <div>
            <p className={styles.verificationEyebrow}>Certificate lookup</p>
            <h2 id="certificate-lookup-title">Check a certificate</h2>
            <p>Scan the QR code, import a certificate image, or enter its certificate number.</p>
          </div>
        </div>

        <div className={styles.scanControls}>
          {isScanning || isStartingScanner ? (
            <Button type="button" variant="outline" size="md" leftIcon="stop_circle" onClick={stopScanner}>
              {isStartingScanner ? 'Cancel scanner startup' : 'Stop scanner'}
            </Button>
          ) : (
            <Button type="button" variant="secondary" size="md" leftIcon={isStartingScanner ? 'hourglass_top' : 'qr_code_scanner'} disabled={isStartingScanner} onClick={handleStartScanner}>
              {isStartingScanner ? 'Opening scanner…' : 'Open barcode scanner'}
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="md"
            leftIcon={isImporting ? 'hourglass_top' : 'upload_file'}
            disabled={isImporting}
            onClick={() => {
              stopScanner();
              fileInputRef.current?.click();
            }}
          >
            {isImporting ? 'Reading image…' : 'Import certificate image'}
          </Button>
          <input
            ref={fileInputRef}
            className={styles.hiddenFileInput}
            type="file"
            accept="image/*"
            aria-label="Import certificate image"
            onChange={handleImageImport}
          />
        </div>

        {(scannerRequested || isScanning || isStartingScanner) && (
          <div className={styles.scanner} aria-live="polite">
            <video ref={videoRef} className={styles.scannerVideo} muted playsInline />
            <p>{isStartingScanner ? 'Starting camera…' : 'Point your camera at the certificate QR code or barcode.'}</p>
          </div>
        )}

        {scanError && <p className={styles.verificationError} role="alert">{scanError}</p>}

        <form className={styles.lookupForm} onSubmit={handleSubmit}>
          <label htmlFor="certificate-number">Certificate number</label>
          <div className={styles.lookupControl}>
            <input
              ref={certificateInputRef}
              id="certificate-number"
              type="text"
              value={certificateNumber}
              onChange={(event) => setCertificateNumber(event.target.value)}
              placeholder="For example, A1-DEMO-2024-001"
              autoComplete="off"
              required
            />
            <Button type="submit" variant="primary" size="md" leftIcon="search">
              Verify certificate
            </Button>
          </div>
        </form>

        {hasSearched && (
          result ? (
            <section className={styles.certificateResult} aria-live="polite" aria-labelledby="certificate-result-title">
              <div className={styles.resultHeader}>
                <span className={styles.validBadge}>
                  <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                  Sample record matched
                </span>
                <span className={styles.resultReference}>{result.certificateNumber}</span>
              </div>
              <h3 id="certificate-result-title">Certificate details</h3>
              <div className={styles.resultPerson}>
                <img src={result.image} alt={`Illustrative sample portrait for ${result.name}`} />
                <dl className={styles.certificateDetails}>
                  <div><dt>Graduate name</dt><dd>{result.name}</dd></div>
                  <div><dt>Graduation year</dt><dd>{result.graduationYear}</dd></div>
                  <div><dt>Course</dt><dd>{result.course}</dd></div>
                </dl>
              </div>
              <p className={styles.resultDisclaimer}>This sample portrait and record are illustrative only. They do not identify a real graduate or confirm a real certificate.</p>
            </section>
          ) : (
            <section className={styles.invalidResult} role="status" aria-live="polite">
              <h3><span className="material-symbols-outlined" aria-hidden="true">cancel</span> No sample record found</h3>
              <p>This certificate number does not match the sample records. This result cannot determine whether a real certificate is valid.</p>
            </section>
          )
        )}
      </section>

      <div className={styles.verificationHelp}>
        <p>Need an official verification?</p>
        <Link to="/contact">Contact A-1 for confirmation from the Institute’s records.</Link>
      </div>
    </div>
  );
}
