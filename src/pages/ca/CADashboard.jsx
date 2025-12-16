import React, { useEffect, useState } from "react";
import "./CADashboard.css";
import Header from "../../components/Header";
import axios from "axios";
const CADashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments,setAssignments] = useState([]);
  const [selectedAssignment,setSelectedAssignment] = useState(null);

  const professionalId = localStorage.getItem("userId");

  // Sample Data
  const kpis = {
    revenue: "₹1,20,000",
    clients: 34,
    completionRate: "92%",
  };

  const clientLeads = [
    { name: "Rohit Sharma", status: "New" },
    { name: "Priya Mehta", status: "Urgent" },
    { name: "Ankit Gupta", status: "Follow-up" },
  ];

  const pendingActions = [
    { task: "Waiting for Form 16 from Riya", due: "Nov 8" },
    { task: "Bank Statement from Aman", due: "Nov 10" },
  ];

  const deadlines = [
    { task: "GST Filing - Rakesh", daysLeft: 2 },
    { task: "ITR Audit - Suman", daysLeft: 6 },
    { task: "Quarterly Report - Kiran", daysLeft: 10 },
  ];

  


  useEffect(()=>{
    fetchClients();
  },[])

  const fetchClients = async() =>{
    const response = await axios.get(
      `http://localhost:8080/ca/user-list/${professionalId}`
    )
    setAssignments(response.data);
    console.log(response);
  }

  const filteredClients = assignments.filter((assignment) =>
  assignment.name?.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
    <Header></Header>
    <div className="ca-dashboard">
      <header className="ca-header">
        <h1>CA Dashboard</h1>
        <p>Welcome back! Here’s an overview of your current performance.</p>
      </header>

      {/* A. KPIs */}
      <section className="kpi-section">
        <div className="kpi-card">
          <h3>Total Revenue</h3>
          <p className="kpi-value">{kpis.revenue}</p>
          <small>for this month</small>
        </div>
        <div className="kpi-card">
          <h3>Active Clients</h3>
          <p className="kpi-value">{kpis.clients}</p>
        </div>
        <div className="kpi-card">
          <h3>Completion Rate</h3>
          <p className="kpi-value">{kpis.completionRate}</p>
        </div>
      </section>

      {/* B. Action Queue */}
      <section className="action-queue">
        <div className="queue-section">
          <h2>New Client Leads</h2>
          <ul>
            {clientLeads.map((lead, i) => (
              <li key={i}>
                {lead.name}{" "}
                <span
                  className={`status-tag ${
                    lead.status === "Urgent"
                      ? "tag-red"
                      : lead.status === "Follow-up"
                      ? "tag-yellow"
                      : "tag-blue"
                  }`}
                >
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="queue-section">
          <h2>Pending Client Actions</h2>
          <ul>
            {pendingActions.map((a, i) => (
              <li key={i}>
                {a.task} <span className="due-date">Due: {a.due}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="queue-section">
          <h2>Upcoming Deadlines</h2>
          <ul>
            {deadlines.map((d, i) => (
              <li
                key={i}
                className={`${
                  d.daysLeft < 3
                    ? "deadline-red"
                    : d.daysLeft < 7
                    ? "deadline-yellow"
                    : ""
                }`}
              >
                {d.task} – {d.daysLeft} days left
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C. Communication */}
      <section className="communication-section">
        <div className="chat-box">
          <h2>Client Chat</h2>
          <div className="chat-window">
            <p><strong>Riya:</strong> Sent bank statement</p>
            <p><strong>You:</strong> Received, reviewing it now.</p>
          </div>
          <input type="text" placeholder="Type a message..." />
        </div>

        <div className="notes-box">
          <h2>Internal Notes</h2>
          <textarea placeholder="Write notes about a client..."></textarea>
        </div>
      </section>

      {/* D. Client Database */}
      <section className="client-database">
        <h2>My Clients</h2>
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Service Type</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((assignment,c) => (
              <tr key={assignment.assignmentId}>
                <td>{assignment.name}</td>
                <td>{assignment.serviceType}</td>
                <td>{assignment.assignmentStatus}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: c.progress + "%" }}
                    ></div>
                  </div>
                  <span>{c.progress}%</span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/client/${c.id}`)}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* E. Document Management */}
      <section className="docs-section">
        <h2>Document Management</h2>
        <button className="docs-btn">View Client Documents</button>
      </section>
    </div>
    </>
  );
};

export default CADashboard;
