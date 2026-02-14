import { useState } from "react";
import api from "../api";

export default function RegisterForm({ onSuccess }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/v1/auth/register", form);
      if (!res.data.success) {
        setError("Registration failed: " + res.data.message);
        return;
      }
      setError("");
      console.log("Register response:", res.data);
      alert("Registration successful");
      onSuccess();
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      )
    }
  };

  return (
    <>
      <div style={div_styles}>
        <form style={form_styles}>
          <input style={input_styles} placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
          <input style={input_styles} placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input style={input_styles} type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <input style={input_styles} placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input style={input_styles} placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />  
        
        <span style={span_styles}></span>
        {error && (
          <div style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
          {error}
          </div>
        )}
        <button style={button_styles} onClick={register}>SignUp</button>
        <span style={span_styles}></span>
        </form>
      </div>
    </>
  );
}
const span_styles = {
    display: "block",
    height: "10px",
}
const button_styles = {
    width: "100%",
    padding: 10,
    fontSize: 16,
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 4,
};

const form_styles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
}
const input_styles = {
    width: "100%",
    height: "42px",
    outlineColor: "initial",
    outlineStyle: "none",
    outlineWidth: "initial",
    borderRadius: "5px",
    marginBottom: "5px",
    border: "1px solid rgba(200, 200, 200, 0.3)",
}

const div_styles = {
    textAlign: "center",
}