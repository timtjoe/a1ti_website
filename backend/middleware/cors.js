require('dotenv').config();
const cors = require('cors');
const { Problem } = require('#libs/error.js');

/**
 * CORS CONFIGURATION
 * Defines security boundaries for origin, methods, and headers.
 */
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];
const METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'HEAD',
  'CONNECT',
  'TRACE',
];
const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'X-Api-Key',
  'If-Modified-Since',
  'Cache-Control',
  'Idempotency-Key',
  'X-Csrf-Token',
];

const corsOptions = {
  // ORIGIN VALIDATION: Enforcing the Security Boundary
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      /** Signals a CORS violation using the Problem registry.*/
      callback(new Problem(Problem.TYPE.CORS_FORBIDDEN));
    }
  },
  methods: METHODS,
  allowedHeaders: ALLOWED_HEADERS,
  credentials: true,
};

module.exports = cors(corsOptions);
