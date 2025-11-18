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
  FaCalendar,
  FaMoneyBill,
} from "react-icons/fa";

export default function LawyerDashboard() {
  // Updated Stats (Pending Client removed)
  const stats = [
    { title: "Total Active Cases", value: "42", icon: <FaFolder /> },
    { title: "Cases Assigned Today", value: "5", icon: <FaClipboardCheck /> },
    { title: "Upcoming Court Dates", value: "4", icon: <FaCalendar /> },
    { title: "Earnings This Month", value: "$14,250", icon: <FaMoneyBill /> },
  ];

  const clientsList = [
    { name: "Rohit Sharma", caseType: "Civil Dispute", status: "Active", progress: 70 },
    { name: "Ayesha Khan", caseType: "Family Law", status: "Pending Docs", progress: 50 },
    { name: "Dhruv Mehta", caseType: "Corporate", status: "Completed", progress: 100 },
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-800">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1B2A] text-white flex flex-col py-8 px-6">
        <h1 className="text-3xl font-semibold mb-10">LegalHelp</h1>

        <nav className="flex flex-col gap-4">
          {[
            { label: "Dashboard", icon: <FaHome /> },
            { label: "My Cases", icon: <FaFolderOpen /> },
            { label: "Profile", icon: <FaUser /> },
            { label: "Appointments", icon: <FaCalendarAlt /> },
          ].map((item, i) => (
            <button
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1A3B5D] transition text-lg"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="flex justify-between items-center bg-white border-b px-8 py-4 shadow-sm">
          <h2 className="text-xl font-bold">Welcome, Lawyer</h2>

          <div className="flex items-center gap-6">
            <FaBell className="text-gray-600 text-xl hover:text-[#2563EB] cursor-pointer" />

            <FaUserCircle className="text-gray-600 text-3xl" />

            <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-8 space-y-10">

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
              >
                <div className="text-[#2563EB] text-3xl mb-3">{s.icon}</div>
                <p className="text-gray-500">{s.title}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </section>

          {/* My Clients Table */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-[#1E40AF]">
              My Clients
            </h2>

            <input
              type="text"
              placeholder="Search clients..."
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-[#2563EB]"
            />

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Client Name</th>
                  <th className="py-3">Case Type</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Progress</th>
                  <th className="py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {clientsList.map((c, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3">{c.name}</td>
                    <td className="py-3">{c.caseType}</td>
                    <td className="py-3">{c.status}</td>
                    <td className="py-3">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#2563EB] h-2 rounded-full"
                          style={{ width: `${c.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 text-center flex gap-3 justify-center">
                      <button className="bg-[#2563EB] text-white px-3 py-2 rounded-lg hover:bg-[#1E40AF] transition">
                        View Profile
                      </button>
                      <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition">
                        Request Docs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        </main>
      </div>
    </div>
  );
}
