import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Make sure it's defined in .env

// ✅ Create Axios Instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request Interceptor — Add Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Response Interceptor — Handle Global Errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "Something went wrong. Please try again.";

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Please try again.";
    } else if (!error.response) {
      errorMessage = "No response from server. Please check your connection.";
    } else {
      errorMessage = error.response.data?.message || errorMessage;
    }

    // Optionally show error: e.g. toast.error(errorMessage)
    return Promise.reject({ ...error, message: errorMessage });
  }
);

// 🌐 Utility API Methods
const apiService = {
  get(url, params = {}) {
    return apiClient.get(url, { params });
  },
  post(url, data) {
    return apiClient.post(url, data);
  },
  put(url, data) {  
    return apiClient.put(url, data);
  },
  delete(url) {
    return apiClient.delete(url);
  },
};

export default apiService;
