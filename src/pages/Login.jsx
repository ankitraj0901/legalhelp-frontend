import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
      const role = localStorage.getItem("role");

      if (role === "CA") {
        navigate("/ca/dashboard");
      } else if (role === "USER") {
        navigate("/user/dashboard");
      } else if (role === "LAWYER") {
        navigate("/lawyer/dashboard");
      } else if (role === "CONSULTANT") {
        navigate("/consultant/dashboard");
      }
    }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password
      });

      const token = response.data.token; 
      const role = response.data.role;

      // store JWT + role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // REDIRECT based on role
      if (role === "CA") {
        navigate("/ca/dashboard");
      } else if (role === "USER") {
        navigate("/user/dashboard");
      } else if (role === "LAWYER") {
        navigate("/lawyer/dashboard");
      } else if (role === "CONSULTANT") {
        navigate("/consultant/dashboard");
      }

    } catch (err) {
      alert("Invalid email or password");
    }
  };



  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="brand">LegalHelp</h2>
        <h4 className="welcome">Welcome back!</h4>
        <p className="subtitle">Login to continue using LegalHelp</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login">
            Log in
          </button>

          <p className="register-link">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-buttons">
          <button className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
