import { useState } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

export default function LoginForm({ onSuccess}) {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginButton = async (e) => {
    e.preventDefault();
    try {
        const res = await api.post("/api/v1/auth/login", { email, password });
        if (!res.data.success) {
            setError("Login failed: " + res.data.message);
            return;
        }
        setError("");
        console.log("Login Response:", res.data);
        login({
            token: res.data.token,
            email: res.data.email,
        });
        onSuccess();
    } catch (error) {
        console.log(error);
        setError(
            error.response?.data?.message || "Something went wrong"
        );
    }
  };

  return (
    <>
        <div style={div_styles}>
            <form style={form_styles}>            
                <input 
                    style = {input_styles} 
                    placeholder="Email" 
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    style = {input_styles} 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} 
                />

            <span style={span_styles}></span>
            <a style={a_styles} href="#forgotpassword">Forgot Password?</a>
            <span style={span_styles}></span>
            <span style={span_styles}></span>
            {error && (
                <div style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
                    {error}
                </div>
            )}
            <button style={button_styles} onClick={loginButton}>SignIn</button>
            </form>
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