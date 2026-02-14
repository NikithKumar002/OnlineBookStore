// import axios from "axios";
const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();
// const backend_host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";

const BACKEND_HOST= process.env.REACT_APP_BACKEND_HOST || "localhost"
const PORT = process.env.REACT_APP_PORT || 3000
const BACKEND_URL=`http://${BACKEND_HOST}:${PORT}`
console.log(BACKEND_URL);
async function checkBackend() {
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 10000;

    while (attempts < maxAttempts) {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/test/test-api`);
            if (res.status === 200) {
                console.log("Backend is running...");
                process.exit(0);
            } else {
                console.warn("Backend is not ready yet, retrying...");
            }
        } catch (err) {
            console.warn("Cannot reach backend, retrying...", err);
        }
        attempts++;
        await new Promise(r => setTimeout(r, delay));
    }
    process.exit(1);
};

checkBackend();