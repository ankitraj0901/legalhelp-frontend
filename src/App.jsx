import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import CADashboard from "./pages/ca/CADashboard";
import RequireAuth from "./auth/RequireAuth";
import CAList from "./pages/ca/CAList";
import LawyerDashboard from "./pages/lawyer/lawyerDashboard";
import ConsultantDashboard from "./pages/consultant/Consultant";


function App() {
  return (
    <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/caList" element={<CAList />} />
        <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
        <Route path="/dashboard/consultant" element={<ConsultantDashboard />} /> */}
        

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
        {/* CA List (protected) */}
        <Route 
          path="/dashboard/user/caList" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <CAList />
            </RequireAuth>
          }
        />
          

        {/* Lawyer */}
        <Route 
          path="/dashboard/lawyer" 
          element={
            <RequireAuth allowedRoles={["LAWYER"]}>
              <LawyerDashboard/>
            </RequireAuth>
          }
        />

        {/* Consultant */}
        <Route 
          path="/dashboard/consultant" 
          element={
            <RequireAuth allowedRoles={["CONSULTANT"]}>
              <ConsultantDashboard/>
            </RequireAuth>
          }
        />

      </Routes>
  );
}

export default App;
