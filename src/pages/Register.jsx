import axios from "axios";
import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role.toUpperCase(),
    };

    if (role === "CA") {
      registrationData.caDetailsDTO = {
        registrationNumber: formData.registrationNo,
        experience: formData.experience,
        specialization: formData.firmName,
      };
    }

    if (role === "LAWYER") {
      registrationData.lawyerDetailsDTO = {
        licenseNumber: formData.registrationNo,
        experience: formData.experience,
        court: formData.firmName,
      };
    }

    if (role === "CONSULTANT") {
      registrationData.consultantDetailsDTO = {
        field: formData.firmName,
        experience: formData.experience,
        firmName: formData.firmName,
      };
    }

    console.log("Sending JSON:", registrationData);

    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/user/register`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response;

      console.log("Server Response:", data);
      navigate("/login");
      toast.success(`Registration successful! Welcome, ${role}.`);

      //Optional: Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Axios puts errors in error.response (if it's an HTTP error)
      // or error.message (if it's a network error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (e.g., 400, 409 Conflict)
        console.error("Registration Error:", error.data);
        alert(
          `Registration Failed: ${error.data.message || "Check your details."}`
        );
      } else if (error.request) {
        // The request was made but no response was received (e.g., server down)
        console.error("Network Error:", error.request);
        toast.error("Network Error: Could not reach the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred during submission.");
      }
    }
  };

  return (
    <div className="register-page">
      {/* <Navbar></Navbar> */}
      <div className="register-card">
        <div className="register-left">
          <h2>Create Your Account</h2>
          <p>Register as a User, Chartered Accountant, Lawyer, or Consultant</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <select
              name="role"
              value={role}
              onChange={handleRoleChange}
              required
            >
              <option value="USER">User</option>
              <option value="CA">Chartered Accountant</option>
              <option value="LAWYER">Lawyer</option>
              <option value="CONSULTANT">Consultant</option>
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
            {(role === "CA" || role === "LAWYER" || role === "CONSULTANT") && (
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
                  placeholder="Court"
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
