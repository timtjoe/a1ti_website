const APPLICANTS_KEY = 'a1ti-demo-applicants-v1';
const SESSION_KEY = 'a1ti-demo-session-v1';
const HASH_ITERATIONS = 120000;

function readApplicants() {
  const savedApplicants = window.localStorage.getItem(APPLICANTS_KEY);
  if (!savedApplicants) return [];

  const applicants = JSON.parse(savedApplicants);
  if (!Array.isArray(applicants)) {
    throw new Error('Saved applicant data is invalid. Clear this site’s data and try again.');
  }
  return applicants;
}

function toBase64(bytes) {
  return window.btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

async function hashPassword(password, salt) {
  if (!window.crypto?.subtle) {
    throw new Error('Secure browser storage is unavailable. Use a current browser on HTTPS or localhost.');
  }
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const hash = await window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: HASH_ITERATIONS },
    keyMaterial,
    256,
  );
  return toBase64(hash);
}

function saveApplicants(applicants) {
  window.localStorage.setItem(APPLICANTS_KEY, JSON.stringify(applicants));
}

function getApplicantByEmail(email) {
  return readApplicants().find((applicant) => applicant.email === email.toLowerCase()) || null;
}

export async function createDemoApplicant({ fullName, phone, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  if (getApplicantByEmail(normalizedEmail)) {
    throw new Error('An account already exists for this email. Sign in instead.');
  }

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const applicant = {
    id: window.crypto.randomUUID(),
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: normalizedEmail,
    passwordSalt: toBase64(salt),
    passwordHash: await hashPassword(password, salt),
    applications: [],
    createdAt: new Date().toISOString(),
  };
  saveApplicants([...readApplicants(), applicant]);
  return { id: applicant.id, fullName: applicant.fullName, email: applicant.email };
}

export async function signInDemoApplicant(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const applicant = getApplicantByEmail(normalizedEmail);
  if (!applicant) throw new Error('No account was found for this email. Create an account first.');

  const salt = Uint8Array.from(window.atob(applicant.passwordSalt), (character) => character.charCodeAt(0));
  const passwordHash = await hashPassword(password, salt);
  if (passwordHash !== applicant.passwordHash) throw new Error('The email or password is incorrect.');

  window.sessionStorage.setItem(SESSION_KEY, applicant.email);
  return { id: applicant.id, fullName: applicant.fullName, email: applicant.email };
}

export function getSignedInApplicant() {
  const email = window.sessionStorage.getItem(SESSION_KEY);
  const applicant = email ? getApplicantByEmail(email) : null;
  if (!applicant) return null;
  return {
    id: applicant.id,
    fullName: applicant.fullName,
    phone: applicant.phone,
    email: applicant.email,
    applications: applicant.applications,
  };
}

export function signOutDemoApplicant() {
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function submitDemoApplication(course) {
  const applicant = getSignedInApplicant();
  if (!applicant) throw new Error('Sign in before submitting an application.');

  const application = {
    reference: `A1-${window.crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    courseId: course.id,
    courseTitle: course.title,
    submittedAt: new Date().toISOString(),
    status: 'Received',
  };
  const applicants = readApplicants().map((savedApplicant) => (
    savedApplicant.id === applicant.id
      ? { ...savedApplicant, applications: [...savedApplicant.applications, application] }
      : savedApplicant
  ));
  saveApplicants(applicants);
  return application;
}
