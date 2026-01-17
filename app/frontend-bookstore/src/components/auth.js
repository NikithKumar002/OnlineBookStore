import { useState } from "react";
import { api } from "../api";

export default function Auth({ setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await api("/api/v1/auth/register", "POST", {
      email,
      password,
    });
    alert(JSON.stringify(res));
  };

  const login = async () => {
    const res = await api("/api/v1/auth/login", "POST", {
      email,
      password,
    });

    if (res.token) {
      setToken(res.token);
      setUser(res.user);
    }
  };

  return (
    <div>
      <h2>Auth</h2>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
