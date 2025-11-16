import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import RegistrationPage from "./pages/RegistrationPage";
import CADashboard from "./pages/CADashboard";
import ClientProfile from "./pages/ClientProfile";
import CAList from "./pages/CAList";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CA Dashboard (protected) */}
        <Route 
          path="/ca/dashboard" 
          element={
            <RequireAuth allowedRoles={["CA"]}>
              <CADashboard />
            </RequireAuth>
          }
        />

        {/* USER Dashboard (protected) */}
        <Route 
          path="/user/dashboard" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <UserDashboard />
            </RequireAuth>
          }
        />

        {/* Lawyer */}
        <Route 
          path="/lawyer/dashboard" 
          element={
            <RequireAuth allowedRoles={["LAWYER"]}>

              {/* create later */}

              <h1>LAWYER Dashboard</h1>
            </RequireAuth>
          }
        />

        {/* Consultant */}
        <Route 
          path="/consultant/dashboard" 
          element={
            <RequireAuth allowedRoles={["CONSULTANT"]}>

              {/* create later */}

              <h1>CONSULTANT Dashboard</h1>
            </RequireAuth>
          }
        />

      </Routes>
  );
}

export default App;
