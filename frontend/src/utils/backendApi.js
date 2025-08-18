import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = {
  /**
   * GET request
   * @param {string} endpoint - relative URL
   * @param {object} headers - optional headers
   */
  get: async (endpoint, headers = {}) => {
    try {
      const url = `${backendUrl}${endpoint}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`GET request error for ${endpoint}:`, error);
      return error.response.data;
    }
  },

  /**
   * POST request
   * @param {string} endpoint - relative URL
   * @param {object} data - request body
   * @param {object} headers - optional headers
   */
  post: async (endpoint, data = {}, headers = {}) => {
    try {
      const url = `${backendUrl}${endpoint}`;
      const response = await axios.post(url, data, {
        headers: {
          "Test-Header": "Test-Value",
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`POST request error for ${endpoint}:`, error);
      return error.response.data;
    }
  },
};

export default api;
