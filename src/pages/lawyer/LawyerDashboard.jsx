import React from "react";
import {
  FaHome,
  FaFolderOpen,
  FaUser,
  FaCalendarAlt,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaFolder,
  FaClipboardCheck,
  FaClock,
  FaCalendar,
  FaMoneyBill,
  FaBalanceScale,
} from "react-icons/fa";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function LawyerDashboard() {
  // ----- Stats -----
  const stats = [
    { title: "Total Active Cases", value: "42", icon: <FaFolder /> },
    { title: "Cases Assigned Today", value: "5", icon: <FaClipboardCheck /> },
    { title: "Pending Client Requests", value: "12", icon: <FaClock /> },
    { title: "Upcoming Court Dates", value: "4", icon: <FaCalendar /> },
    { title: "Earnings This Month", value: "$14,250", icon: <FaMoneyBill /> },
  ];

  // ----- Chart Data -----
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Cases",
        data: [12, 19, 8, 15, 22, 17],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  // ----- Recent Updates -----
  const recentUpdates = [
    "Case #593 updated by client.",
    "New evidence added for Case #402.",
    "Court rescheduled for Case #188.",
  ];

  // ----- Appointments -----
  const appointments = [
    { time: "10:00 AM", client: "John Doe", case: "Civil Dispute" },
    { time: "2:00 PM", client: "Mia Ray", case: "Family Law" },
  ];

  // ----- Case Categories -----
  const categories = ["Criminal", "Civil", "Corporate", "Family Law", "Immigration"];

  return (
    <div className="flex bg-gray-100 h-screen w-screen overflow-hidden">

      {/* ---------------- Sidebar ---------------- */}
      <div className="w-64 bg-[#1E293B] text-white flex flex-col py-6 px-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">LegalHelp</h1>

        <nav className="flex flex-col gap-3">
          {[
            { label: "Dashboard", icon: <FaHome /> },
            { label: "My Cases", icon: <FaFolderOpen /> },
            { label: "Profile", icon: <FaUser /> },
            { label: "Appointments", icon: <FaCalendarAlt /> },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#3B82F6] transition"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ---------------- Main Content Wrapper ---------------- */}
      <div className="flex flex-col w-full">

        {/* ---------------- Topbar ---------------- */}
        <div className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700">Welcome, Lawyer</h2>

          <div className="flex items-center gap-6">
            <FaBell className="text-gray-500 text-xl cursor-pointer hover:text-[#3B82F6]" />
            <FaUserCircle className="text-gray-500 text-3xl" />

            <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        {/* ---------------- Dashboard Content ---------------- */}
        <div className="p-6 overflow-y-auto">

          {/* ------- Stat Cards ------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {stats.map((card, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:scale-[1.02] transition cursor-pointer"
              >
                <div className="text-[#3B82F6] text-3xl mb-3">{card.icon}</div>
                <h3 className="text-sm text-gray-500">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/* ------- Chart + Updates + Appointments ------- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* Monthly Chart */}
            <div className="bg-white p-5 rounded-xl shadow h-[320px]">
              <h3 className="font-bold text-gray-700 mb-4">Monthly Case Statistics</h3>
              <Bar data={chartData} />
            </div>

            {/* Recent Updates */}
            <div className="bg-white p-5 rounded-xl shadow h-[320px] overflow-y-auto">
              <h3 className="font-bold text-gray-700 mb-4">Recent Case Updates</h3>
              <ul className="space-y-3">
                {recentUpdates.map((u, i) => (
                  <li key={i} className="bg-gray-100 p-3 rounded-lg text-gray-700 shadow-sm">
                    {u}
                  </li>
                ))}
              </ul>
            </div>

            {/* Appointments */}
            <div className="bg-white p-5 rounded-xl shadow h-[320px] overflow-y-auto">
              <h3 className="font-bold text-gray-700 mb-4">Upcoming Appointments</h3>
              <ul className="space-y-4">
                {appointments.map((a, i) => (
                  <li key={i} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                    <p className="font-semibold">{a.time}</p>
                    <p className="text-gray-600">{a.client}</p>
                    <p className="text-sm text-gray-500">{a.case}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ------- Case Categories ------- */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Case Categories</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow flex flex-col items-center gap-3 hover:scale-[1.03] transition cursor-pointer"
                >
                  <FaBalanceScale className="text-[#3B82F6] text-3xl" />
                  <p className="font-semibold text-gray-700">{cat}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
