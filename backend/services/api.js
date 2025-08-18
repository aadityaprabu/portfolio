const axios = require("axios");
const api = {
  /**
   * GET request
   * @param {string} endpoint - relative URL
   * @param {object} headers - optional headers
   */
  get: async (endpoint, headers = {}) => {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return response;
    } catch (error) {
      console.error(`GET request error for ${endpoint}:`, error);
      return error.response;
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
      const url = `${endpoint}`;
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return response;
    } catch (error) {
      console.error(`POST request error for ${endpoint}:`, error);
      return error.response;
    }
  },
};
module.exports = api;
