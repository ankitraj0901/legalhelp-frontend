import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import CADashboard from "./pages/ca/CADashboard";
import RequireAuth from "./auth/RequireAuth";
import CAList from "./pages/ca/CAList";
import LawyerDashboard from "./pages/lawyer/lawyerDashboard";


function App() {
  return (
    <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/caList" element={<CAList />} />
        <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
        

        {/* CA Dashboard (protected) */}
        <Route 
          path="/dashboard/ca" 
          element={
            <RequireAuth allowedRoles={["CA"]}>
              <CADashboard />
            </RequireAuth>
          }
        />

        {/* USER Dashboard (protected) */}
        <Route 
          path="/dashboard/user" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <UserDashboard />
            </RequireAuth>
          }
        />

        {/* Lawyer */}
        <Route 
          path="/dashboard/lawyer" 
          element={
            <RequireAuth allowedRoles={["LAWYER"]}>

              {/* create later */}

              <h1>LAWYER Dashboard</h1>
            </RequireAuth>
          }
        />

        {/* Consultant */}
        <Route 
          path="/dashboard/consultant" 
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
