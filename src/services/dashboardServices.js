import { ENDPOINTS } from '../config/api';
import { authClient } from './authClient';

export async function fetchServiceDay() {
  return authClient(ENDPOINTS.serviceDays, {
    method: 'GET',
    auth: true,
  });
}
export async function submitServiceAttendance(payload) {
  return authClient(ENDPOINTS.submitService, {
    method: 'POST',
    body: payload,
    auth: true,
  });
}

export async function fetchAllService() {
  return authClient(ENDPOINTS.ALLSERVICE, {
    method: 'GET',
    auth: true,
  });
}
export async function markMemberAbsent(payload) {
  return authClient(ENDPOINTS.MARKABSENT, {
    method: 'POST',
    body: payload,
    auth: true,
  });
}
export async function ALLATTENDANCEMEMBER() {
  return authClient(ENDPOINTS.ALLATTENDANCE, {
    method: 'GET',
    auth: true,
  });
}
