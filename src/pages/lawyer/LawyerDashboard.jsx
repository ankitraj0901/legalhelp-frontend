import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function LawyerDashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignmentCount, setAssignmentCount] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);

  const professionalId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  /*Getting client for the logged in professional*/
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ca/clients-list/${professionalId}`,
      );
      setAssignments(response.data);
      console.log(response.data);
      setAssignmentCount(response.data.length);
    } catch (error) {
      toast.error("Error while Getting Assignments");
    }
  };

  /* Logic for search the clients in available clients */
  const filteredAssignments = assignments.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assignmentStatus.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* Logic for clients assigned Today itself */

  const today = new Date().toISOString().split("T")[0];

  // 2️ Filter assignments assigned today
  const todayLeads = assignments.filter((assignment) => {
    return assignment.assignmentDate === today;
  });
  const assignedTodayCount = todayLeads.length;

  /* Count upcoming court dates */
  const Today = new Date();

  const activeUpcomingCount = assignments.filter((a) => {
    if (!a.dueDate) return false; // ignore null dates

    const due = new Date(a.dueDate);

    return a.assignmentStatus === "ACTIVE" && due > Today;
  }).length;

  console.log("Active assignments with future due date:", activeUpcomingCount);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Updated Stats (Pending Client removed)
  const stats = [
    { title: "Total Active Cases", value: assignmentCount, icon: <FaFolder /> },
    {
      title: "Cases Assigned Today",
      value: assignedTodayCount,
      icon: <FaClipboardCheck />,
    },
    {
      title: "Upcoming Court Dates",
      value: activeUpcomingCount,
      icon: <FaCalendar />,
    },
    { title: "Earnings This Month", value: "₹14,250", icon: <FaMoneyBill /> },
  ];


  
  // Handling My Cases section Logic
  const cases = assignments.filter((a) => a.title);

  const handleStatusChange = (id, status) => {
    console.log(id, status);
    // call backend API to update assignmentStatus
  };

  const openDescription = (caseData) => {
    alert(caseData.description || "No description provided");
  };

  const askPayment = (assignmentId) => {
    navigate(`/dashboard/lawyer/payment/${assignmentId}`);
  };

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
          <h2 className="text-xl font-bold">Welcome, Lawyer {name}</h2>

          <div className="flex items-center gap-6">
            <FaBell className="text-gray-600 text-xl hover:text-[#2563EB] cursor-pointer" />

            <FaUserCircle className="text-gray-600 text-3xl" />

            <button
              className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition"
              onClick={logout}
            >
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

            {/* Search */}
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-[#2563EB]"
            />

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-2">Client Name</th>
                  <th className="py-3 px-2">Service Type</th>
                  <th className="py-3 px-2 text-center">Status</th>
                  <th className="py-3 px-2 text-center">Message</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment.assignmentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-2">{assignment.name}</td>

                    <td className="py-3 px-2">{assignment.serviceType}</td>

                    <td className="py-3 px-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  assignment.assignmentStatus === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                      >
                        {assignment.assignmentStatus}
                      </span>
                    </td>

                    {/* Chat */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/lawyer/chat?conv_id=${
                              assignment.assignmentId
                            }&id=${assignment.clientId}&role=${
                              assignment.role
                            }&name=${encodeURIComponent(assignment.name)}`,
                          )
                        }
                        className="
                inline-flex items-center gap-2
                bg-green-500 hover:bg-green-600
                text-white font-medium
                px-4 py-2
                rounded-md
                transition-colors
              "
                      >
                        Chat
                      </button>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() =>
                          navigate(`/client/${assignment.clientId}`)
                        }
                        className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* My Cases Table */}
          <section className="bg-white rounded-xl shadow-lg p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-[#1E40AF]">
              My Cases
            </h2>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-2">Client</th>
                  <th className="py-3 px-2">Title</th>
                  <th className="py-3 px-2">Due Date</th>
                  <th className="py-3 px-2 text-center">Status</th>
                  <th className="py-3 px-2 text-center">Description</th>
                  <th className="py-3 px-2 text-center">Payment</th>
                </tr>
              </thead>

              <tbody>
                {cases.map((c) => (
                  <tr
                    key={c.assignmentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-2">{c.name}</td>

                    <td className="py-3 px-2 font-medium">{c.title}</td>

                    <td className="py-3 px-2">{c.dueDate || "N/A"}</td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-2 text-center">
                      <select
                        value={c.assignmentStatus}
                        onChange={(e) =>
                          handleStatusChange(c.assignmentId, e.target.value)
                        }
                        className="border rounded-lg px-3 py-1 text-sm"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>

                    {/* Description Button */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm"
                      >
                        View
                      </button>
                    </td>

                    {/* Ask Payment */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => askPayment(c.assignmentId)}
                        className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700"
                      >
                        Ask Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedCase && (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent">
                <div className="bg-white rounded-xl shadow-2xl w-[420px] p-6 relative border">
                  <h3 className="text-lg font-semibold text-[#1E40AF] mb-3">
                    Case Description
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {selectedCase.description || "No description provided"}
                  </p>

                  <div className="text-sm text-gray-500 mb-4">
                    <strong>Client:</strong> {selectedCase.name}
                    <br />
                    <strong>Title:</strong> {selectedCase.title}
                  </div>

                  <button
                    onClick={() => setSelectedCase(null)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
                  >
                    ✕
                  </button>

                  <div className="text-right">
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="bg-[#2563EB] text-white px-5 py-2 rounded-lg hover:bg-[#1E40AF]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
