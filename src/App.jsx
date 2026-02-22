import {Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserDashboard from "@/pages/user/UserDashboard";
import CADashboard from "@/pages/ca/CADashboard";
import RequireAuth from "./auth/RequireAuth";
import CAList from "@/pages/ca/CAList";
import LawyerDashboard from "@/pages/lawyer/LawyerDashboard";
import ConsultantDashboard from "@/pages/consultant/Consultant";
import LawyerList from "@/pages/lawyer/lawyerList";
import ConsultantList from "@/pages/consultant/consultantList";
import TaxPrediction from "@/pages/ml/TaxPrediction";
import TaxOptimization from "@/pages/ml/TaxOptimization";
import { ToastContainer } from "react-toastify";
import Investment from "@/pages/ml/Investment";
import ChatPage from "@/pages/chat/chat";


function App() {
  return (
    <>
    <ToastContainer  />
    <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="dashboard/lawyerList" element={<LawyerList />} />
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
          path="/user/dashboard" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <UserDashboard />
            </RequireAuth>
          }
        />
        {/* CA List (protected) */}
        <Route 
          path="/user/dashboard/caList" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <CAList />
            </RequireAuth>
          }
        />
          

        {/* Lawyer */}
        <Route 
          path="/lawyer/dashboard" 
          element={
            <RequireAuth allowedRoles={["LAWYER"]}>
              <LawyerDashboard/>
            </RequireAuth>
          }
        />

        {/* LawyerList (protected) */}
        <Route 
          path="/user/dashboard/lawyerList" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <LawyerList/>
            </RequireAuth>
          }
        />

        {/* Consultant */}
        <Route 
          path="/consultant/dashboard" 
          element={
            <RequireAuth allowedRoles={["CONSULTANT"]}>
              <ConsultantDashboard/>
            </RequireAuth>
          }
        />

        {/* ConsultantList (protected) */}
        <Route 
          path="/user/dashboard/consultantList" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <ConsultantList/>
            </RequireAuth>
          }
        />

        {/* Machine Learning Pages */}
        {/* Tax prediction  */}
        <Route 
          path="/user/dashboard/tax-prediction" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <TaxPrediction/>
            </RequireAuth>
          }
        />

        <Route 
          path="/user/dashboard/tax-optimizer" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <TaxOptimization/>
            </RequireAuth>
          }
        />

        {/* Chat Page */}
        {/* One-to-One chat page  */}
        <Route 
          path="/user/dashboard/chat" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <ChatPage/>
            </RequireAuth>
          }
        />
        <Route 
          path="/dashboard/ca/chat" 
          element={
            <RequireAuth allowedRoles={["CA"]}>
              <ChatPage/>
            </RequireAuth>
          }
        />


        {/* Investment suggestion  */}
        <Route 
          path="/user/dashboard/investment" 
          element={
            <RequireAuth allowedRoles={["USER"]}>
              <Investment/>
            </RequireAuth>
          }
        />

      </Routes>
      </>
  );
}

export default App;
