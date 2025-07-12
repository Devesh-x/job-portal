// API Endpoints - Use environment variables for deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Debug: Check if environment variables are loading
console.log('Environment Variables Check:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  'API_BASE_URL (resolved)': API_BASE_URL
});

// Construct endpoints from base URL (simplified approach)
export const USER_API_END_POINT = `${API_BASE_URL}/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/company`;

// Debug: Log the API endpoints in development
if (import.meta.env.DEV) {
  console.log('API Endpoints:', {
    USER_API_END_POINT,
    JOB_API_END_POINT,
    APPLICATION_API_END_POINT,
    COMPANY_API_END_POINT
  });
}

// Also log in production for debugging
console.log('Current API Endpoints:', {
  USER_API_END_POINT,
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
  COMPANY_API_END_POINT
});