import axios from "axios";

console.log(window.location.origin);
console.log(axiosBaseURL);

if (window.location.origin === "http://localhost:8000") {
  const axiosBaseURL = "http://127.0.0.1:8000"; // development address
} else {
  const axiosBaseURL = window.location.origin; // production address
}

console.log(axiosBaseURL);

export default axios.create({
	baseURL: axiosBaseURL,
});