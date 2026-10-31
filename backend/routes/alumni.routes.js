const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// In-memory stores for demo and review purposes. Replace with a database
// repository when the alumni hiring and job board are production ready.
const hireInquiries = [];
const jobApplications = [];
const joinRequests = [];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const DOCUMENT_TYPES = new Set([
  ...CV_TYPES,
  'image/jpeg',
  'image/png',
  'image/webp',
]);
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const applicationUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES, files: 6 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'cv' && !CV_TYPES.has(file.mimetype)) {
      const error = new Error('Upload your CV as a PDF or Word document.');
      error.code = 'INVALID_CV_TYPE';
      return cb(error);
    }
    if (file.fieldname === 'documents' && !DOCUMENT_TYPES.has(file.mimetype)) {
      const error = new Error('Supporting documents must be PDF, Word, JPEG, PNG, or WebP files.');
      error.code = 'INVALID_DOCUMENT_TYPE';
      return cb(error);
    }
    return cb(null, true);
  },
});

// The demo stores only file metadata (not the bytes) because there is no
// database or object storage behind these routes yet.
function fileMetadata(file) {
  return {
    originalName: file.originalname,
    mimeType: file.mimetype,
    sizeBytes: file.size,
  };
}

function handleApplicationUpload(req, res, next) {
  applicationUpload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'documents', maxCount: 5 },
  ])(req, res, (error) => {
    if (!error) return next();

    let message = 'The uploaded files could not be processed.';
    if (error.code === 'LIMIT_FILE_SIZE') {
      message = 'Each uploaded file must be 5 MB or smaller.';
    } else if (error.code === 'LIMIT_FILE_COUNT' || error.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Upload one CV and up to five supporting documents.';
    } else if (error.code === 'INVALID_CV_TYPE' || error.code === 'INVALID_DOCUMENT_TYPE') {
      message = error.message;
    }

    return res.status(400).json({
      success: false,
      message,
      errors: [{ field: 'files', message }],
    });
  });
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function requiredFields(body, fields) {
  return fields.filter((field) => !clean(body[field]));
}

function makeReference(prefix) {
  return `${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function validateEmail(value, res) {
  if (!EMAIL_PATTERN.test(clean(value))) {
    res.status(400).json({
      success: false,
      message: 'Enter a valid email address.',
      errors: [{ field: 'email', message: 'Enter a valid email address.' }],
    });
    return false;
  }
  return true;
}

// POST /v1/alumni/hire-inquiries — employer wants to hire a featured graduate
router.post('/hire-inquiries', (req, res) => {
  const body = req.body || {};
  const missing = requiredFields(body, [
    'personName',
    'organization',
    'contact',
    'email',
    'phone',
    'details',
  ]);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.',
      errors: missing.map((field) => ({ field, message: `${field} is required.` })),
    });
  }

  if (!validateEmail(body.email, res)) return undefined;

  const inquiry = {
    id: crypto.randomUUID(),
    reference: makeReference('HIRE'),
    personId: clean(body.personId),
    personName: clean(body.personName),
    organization: clean(body.organization),
    contact: clean(body.contact),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    details: clean(body.details),
    status: 'Received',
    submittedAt: new Date().toISOString(),
  };

  hireInquiries.push(inquiry);

  return res.status(201).json({
    success: true,
    message: 'Your hiring inquiry has been received.',
    data: inquiry,
  });
});

// POST /v1/alumni/job-applications — graduate applies for a job opportunity
router.post('/job-applications', handleApplicationUpload, (req, res) => {
  const body = req.body || {};
  const missing = requiredFields(body, ['jobTitle', 'name', 'email', 'phone', 'details']);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.',
      errors: missing.map((field) => ({ field, message: `${field} is required.` })),
    });
  }

  if (!validateEmail(body.email, res)) return undefined;

  const cv = req.files?.cv?.[0];
  if (!cv) {
    return res.status(400).json({
      success: false,
      message: 'Upload your CV to submit an application.',
      errors: [{ field: 'cv', message: 'A CV is required.' }],
    });
  }

  const documents = req.files?.documents || [];

  const application = {
    id: crypto.randomUUID(),
    reference: makeReference('JOB'),
    jobId: clean(body.jobId),
    jobTitle: clean(body.jobTitle),
    organization: clean(body.organization),
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    details: clean(body.details),
    files: {
      cv: fileMetadata(cv),
      documents: documents.map(fileMetadata),
    },
    status: 'Received',
    submittedAt: new Date().toISOString(),
  };

  jobApplications.push(application);

  return res.status(201).json({
    success: true,
    message: 'Your job application has been received.',
    data: application,
  });
});

// POST /v1/alumni/join-requests — graduate asks to join the alumni network
router.post('/join-requests', (req, res) => {
  const body = req.body || {};
  const missing = requiredFields(body, ['name', 'email', 'phone', 'course']);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.',
      errors: missing.map((field) => ({ field, message: `${field} is required.` })),
    });
  }

  if (!validateEmail(body.email, res)) return undefined;

  const request = {
    id: crypto.randomUUID(),
    reference: makeReference('ALUM'),
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    course: clean(body.course),
    details: clean(body.details),
    status: 'Received',
    submittedAt: new Date().toISOString(),
  };

  joinRequests.push(request);

  return res.status(201).json({
    success: true,
    message: 'Your alumni network request has been received.',
    data: request,
  });
});

module.exports = router;
