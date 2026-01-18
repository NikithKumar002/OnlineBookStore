import { useState } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.post("/api/v1/auth/login", { email, password });
    login(res.data);
    alert("Logged in");
  };

  return (
    <>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </>
  );
}
