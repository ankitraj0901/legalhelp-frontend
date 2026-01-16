import React from "react";
import {useNavigate} from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserCircle,
  FaChartBar,
  FaSearch,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarItems = [
  { label: "Dashboard", icon: <FaHome /> },
  { label: "Clients", icon: <FaUsers /> },
  { label: "Profile", icon: <FaUserCircle /> },
  { label: "Reports", icon: <FaChartBar /> },
];

const overviewData = [
  { label: "Total Clients", value: 125 },
  { label: "New Requests", value: 14 },
  { label: "Revenue This Month", value: "$52,400" },
];

const clientsList = [
  { name: "Vivek Patel", service: "ITR Filing", status: "Active", progress: 70 },
  { name: "Sana Khan", service: "GST", status: "Pending Docs", progress: 50 },
  { name: "Raj Verma", service: "Audit", status: "Completed", progress: 100 },
];

const upcomingMeetings = [
  { date: "Nov 20", time: "10:00 AM", client: "John Doe", subject: "Tax Review" },
  { date: "Nov 22", time: "2:00 PM", client: "Anna Smith", subject: "Compliance Check" },
  { date: "Nov 25", time: "11:30 AM", client: "Michael Lee", subject: "Business Setup" },
];

export default function ConsultantDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1B2A] text-white flex flex-col py-8 px-6 shadow-lg">
        <h1 className="text-3xl font-semibold mb-10 tracking-wide">LegalHelp</h1>
        <nav className="flex flex-col gap-4">
          {sidebarItems.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1A3B5D] transition-colors font-medium text-lg"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-between items-center bg-white border-b px-8 py-4 shadow-sm">
          <div className="relative w-1/2">
            <input
              type="search"
              placeholder="Search..."
              className="w-full border rounded-lg py-2 px-4 pl-10 focus:ring-2 focus:ring-[#2563EB]"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative hover:text-[#2563EB] transition">
              <FaBell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="rounded-full w-10 h-10 border-2 border-[#2563EB]"
            />

            <button className="bg-[#2563EB] text-white px-5 py-2 rounded-lg hover:bg-[#1E40AF] transition flex items-center gap-2" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-8 space-y-8 overflow-y-auto">
          {/* Overview Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {overviewData.map(({ label, value }, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition cursor-pointer"
              >
                <h3 className="text-gray-500 font-semibold mb-2">{label}</h3>
                <p className="text-3xl font-extrabold text-[#1E40AF]">{value}</p>
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

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 font-medium">Client Name</th>
                  <th className="py-3 font-medium">Service Type</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Progress</th>
                  <th className="py-3 font-medium text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {clientsList.map((c, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3">{c.name}</td>
                    <td className="py-3">{c.service}</td>
                    <td className="py-3">{c.status}</td>
                    <td className="py-3">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="h-2 bg-[#2563EB] rounded-full"
                          style={{ width: `${c.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="text-center">
                      <button className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Upcoming Meetings */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#1E40AF]">
              Upcoming Meetings
            </h2>

            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 font-medium">Date</th>
                  <th className="py-2 font-medium">Time</th>
                  <th className="py-2 font-medium">Client</th>
                  <th className="py-2 font-medium">Subject</th>
                </tr>
              </thead>

              <tbody>
                {upcomingMeetings.map((m, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3">{m.date}</td>
                    <td className="py-3">{m.time}</td>
                    <td className="py-3">{m.client}</td>
                    <td className="py-3">{m.subject}</td>
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
