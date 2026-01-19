import axios from "axios";


const backend_host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";
async function checkBackend() {
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            const res = await axios.get(`${backend_host}/api/v1/test/test-api`);
            if (res.status === 200) {
                console.log("Backend is running...");
                process.exit(0);
            } else {
                console.warn("Backend is not ready yet, retrying...");
            }
        } catch (err) {
            console.warn("Cannot reach backend, retrying...");
        }
        attempts++;
    }
    process.exit(1);
};

checkBackend();