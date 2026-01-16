import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);

      const token = data.token;
      const role = data.role;
      const userId = data.userId;
      const name = data.name;
      // { token : "", user: {id, name, email}
      // }

      // store JWT + role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      // REDIRECT based on role
      if (role === "CA") {
        navigate("/dashboard/ca");
      } else if (role === "USER") {
        navigate("/user/dashboard");
      } else if (role === "LAWYER") {
        navigate("/lawyer/dashboard");
      } else if (role === "CONSULTANT") {
        navigate("/dashboard/consultant");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login">
            Log in
          </button>

          <p className="register-link">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </form>

        {/*  */}

        {/* <div className="social-buttons">
          <button className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
