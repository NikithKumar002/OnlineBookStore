import { useState } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

export default function LoginForm({ onSuccess}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginButton = async () => {
    const res = await api.post("/api/v1/auth/login", { email, password });
    if (!res.data.success) {
        alert("Login failed: " + res.data.message);
        return;
    }
    console.log("Login Response:", res.data);
    login(res.data);
    onSuccess();
  };

  return (
    <>
        <div style={div_styles}>
            <form style={form_styles}>            
                <input style = {input_styles} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input style = {input_styles} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </form>
            <span style={span_styles}></span>
            <a style={a_styles} href="/forgot-password">Forgot Password?</a>
            <span style={span_styles}></span>
            <button style={button_styles} onClick={loginButton}>SignIn</button>
        </div>
        
    </>
  );
}
const a_styles = {
    fontSize: "12px",
    textAlign: "right",
    display: "block",
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