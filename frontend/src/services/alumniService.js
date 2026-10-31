import { apiClient } from './apiClient';

export function submitHireInquiry(payload) {
  return apiClient.post('/alumni/hire-inquiries', payload);
}

export function submitJobApplication(payload) {
  const isMultipart = payload instanceof FormData;
  return apiClient.post('/alumni/job-applications', payload, {
    headers: isMultipart ? { 'Content-Type': undefined } : { 'Content-Type': 'application/json' },
  });
}

export function submitAlumniJoinRequest(payload) {
  return apiClient.post('/alumni/join-requests', payload);
}
