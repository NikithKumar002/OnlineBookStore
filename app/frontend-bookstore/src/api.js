const axios = require("axios");

const BACKEND_HOST= process.env.REACT_APP_BACKEND_HOST || "localhost"
const PORT = process.env.REACT_APP_PORT || 3000
const BACKEND_URL=`http://${BACKEND_HOST}:${PORT}`

const api = axios.create({
  baseURL: BACKEND_URL || "/api", // Nginx URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
