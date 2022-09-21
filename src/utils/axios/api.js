import axios from "axios";

const instance = axios.create({
  baseURL:
    window.location.origin === "http://localhost:8000"
      ? "http://localhost:8000"
      : window.location.origin,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default instance;