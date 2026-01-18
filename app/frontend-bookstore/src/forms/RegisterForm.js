import { useState } from "react";
import api from "../api";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const register = async () => {
    await api.post("/api/v1/auth/register", form);
    alert("Registration successful");
  };

  return (
    <>
      <div>
        <h2> New User Registration </h2>
        <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        <button onClick={register}> Sign Up </button>
      </div>
    </>
  );
}
