// API Endpoints - Use environment variables for deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const USER_API_END_POINT = import.meta.env.VITE_USER_API_ENDPOINT || `${API_BASE_URL}/user`;
export const JOB_API_END_POINT = import.meta.env.VITE_JOB_API_END_POINT || `${API_BASE_URL}/job`;
export const APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API_END_POINT || `${API_BASE_URL}/application`;
export const COMPANY_API_END_POINT = import.meta.env.VITE_COMPANY_API_END_POINT || `${API_BASE_URL}/company`;