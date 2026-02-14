import { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import BooksForm from "./pages/BooksForm";
import CategoryForm from "./pages/CategoryForm";
import ReviewForm from "./pages/ReviewForm";
import Home from "./pages/Home";

function MainApp() {
  const [active, setActive] = useState(null);
  const auth = useAuth();
  console.log(auth);
  const user = auth?.user;

  console.log("Rendering Login Form"); 
  console.log("Active state:", active);     

  return (
    <>
      <Navbar onAction={setActive} />

      {user && !active && <Home />}

      {active === "User Login" && (
        <Modal title="User Login" onClose={() => setActive(null)} onSwitch={() => setActive("User Login")}>
          <LoginForm onSuccess={() => setActive(null)}/>
        </Modal>
      )}

      {active === "New User Registration" && (
        <Modal title="New User Registration" onClose={() => setActive(null)} onSwitch={() => setActive("New User Registration")}>
          <RegisterForm onSuccess={() => setActive(null)}/>
        </Modal>
      )}

      {user && active === "books" && (
        <Modal title="Books" onClose={() => setActive(null)}>
          <BooksForm onSuccess={() => setActive(null)}/>
        </Modal>
      )}

      {user && active === "category" && (
        <Modal title="Category" onClose={() => setActive(null)}>
          <CategoryForm onSuccess={() => setActive(null)}/>
        </Modal>
      )}

      {user && active === "review" && (
        <Modal title="Review" onClose={() => setActive(null)}>
          <ReviewForm onSuccess={() => setActive(null)}/>
        </Modal>
      )}

    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
