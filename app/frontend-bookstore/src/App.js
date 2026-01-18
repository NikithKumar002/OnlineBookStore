import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import BooksForm from "./forms/BooksForm";
import CategoryForm from "./forms/CategoryForm";
import ReviewForm from "./forms/ReviewForm";
import axios from "axios";

function MainApp() {
  const [active, setActive] = useState(null);
  const { user } = useAuth();

  return (
    <>
      <Navbar onAction={setActive} />

      {active === "login" && (
        <Modal title="Login" onClose={() => setActive(null)}>
          <LoginForm />
        </Modal>
      )}

      {active === "register" && (
        <Modal title="Register" onClose={() => setActive(null)}>
          <RegisterForm />
        </Modal>
      )}

      {user && active === "books" && (
        <Modal title="Books" onClose={() => setActive(null)}>
          <BooksForm />
        </Modal>
      )}

      {user && active === "category" && (
        <Modal title="Category" onClose={() => setActive(null)}>
          <CategoryForm />
        </Modal>
      )}

      {user && active === "review" && (
        <Modal title="Review" onClose={() => setActive(null)}>
          <ReviewForm />
        </Modal>
      )}
    </>
  );
}

export default function App() {
  const [backendReady, setBackendReady] = useState(false);
  
  useEffect(() => {
    console.log("Checking for the backend is running or not ...");
    const checkBackend = async () => {
      const backend_host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";
      let isReady = false;
      let attempts = 0;
      const maxAttempts = 5;

      while (!isReady && attempts < maxAttempts) {
        try {
          const res = await axios.get(`${backend_host}/api/v1/test/test-api`);
          if (res.status === 200) {
            console.log("Backend is running...");
            isReady = true;
            setBackendReady(true);
          } else {
            console.warn("Backend is not ready yet, retrying...");
          }
        } catch (err) {
          console.warn("Cannot reach backend, retrying...");
        }

        attempts++;
        if (!isReady) await new Promise((r) => setTimeout(r, 2000));
      }

      if (!isReady) {
        console.error("Backend did not respond after multiple attempts.");
        alert("Backend not available. Please start your server.");
      }
    };

    checkBackend();
  }, []);

  if (!backendReady) {
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Checking Backend Status...</h2>
      <p>Please wait while we verify the backend server is running.</p>
    </div>
  } else {
    return (
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    );
  }
}
