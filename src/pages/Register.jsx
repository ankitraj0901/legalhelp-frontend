import React, { useState } from "react";
import "./Register.css";
import Navbar from '../components/Navbar'
const RegisterPage = () => {
  const [role, setRole] = useState("User");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationNo: "",
    experience: "",
    firmName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", { role, ...formData });
    alert(`${role} registered successfully!`);
  };

  return (
    <div className="register-page">
      <Navbar></Navbar>
      <div className="register-card">
        <div className="register-left">
          <h2>Create Your Account</h2>
          <p>Register as a User, Chartered Accountant, Lawyer, or Consultant</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <select name="role" value={role} onChange={handleRoleChange} required>
              <option value="User">User</option>
              <option value="CA">Chartered Accountant</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Consultant">Consultant</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {/* Extra fields for professionals */}
            {(role === "CA" || role === "Lawyer" || role === "Consultant") && (
              <>
                <input
                  type="text"
                  name="registrationNo"
                  placeholder={
                    role === "CA"
                      ? "CA Registration No."
                      : role === "Lawyer"
                      ? "Bar Registration No."
                      : "Consultant ID"
                  }
                  value={formData.registrationNo}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (in years)"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="firmName"
                  placeholder="Firm / Organization Name"
                  value={formData.firmName}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button type="submit">Register</button>
          </form>
          <p className="login-text">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>

        <div className="register-right">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg"
            alt="Registration Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
