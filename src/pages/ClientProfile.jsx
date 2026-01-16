import React from "react";
import "./ClientProfile.css";

const ClientProfile = () => {
  // Example dummy data (you can replace it with props or API data)
  const client = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    service: "ITR Filing 2024",
    progress: 75,
    paymentStatus: "Pending",
    lastPayment: "₹1,200 / ₹2,000",
    lastUpdate: "Nov 6, 2025",
    assignedDate: "Apr 12, 2025",
  };

  const messages = [
    { from: "CA", text: "Hi Rahul, please upload your Form 16.", date: "Oct 22, 2025" },
    { from: "Client", text: "Uploaded the Form 16. Please confirm.", date: "Oct 23, 2025" },
    { from: "CA", text: "Received. Reviewing now.", date: "Oct 23, 2025" },
  ];

  const serviceSteps = [
    { step: "Documents Uploaded", completed: true },
    { step: "Verification", completed: true },
    { step: "Review", completed: false },
    { step: "E-Filing", completed: false },
  ];

  return (
    <div className="client-profile-container">
      <header className="client-header">
        <h1>{client.name}</h1>
        <p>{client.service}</p>
      </header>

      {/* Client Info Section */}
      <section className="client-info">
        <div className="info-card">
          <h3>Contact Details</h3>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Assigned Date:</strong> {client.assignedDate}</p>
          <p><strong>Last Update:</strong> {client.lastUpdate}</p>
        </div>

        <div className="info-card">
          <h3>Payment Status</h3>
          <p><strong>Current Status:</strong> {client.paymentStatus}</p>
          <p><strong>Last Payment:</strong> {client.lastPayment}</p>
          <button className="payment-btn">Mark as Paid</button>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="progress-section">
        <h3>Service Progress</h3>
        <div className="progress-bar-container">
          {serviceSteps.map((s, i) => (
            <div
              key={i}
              className={`progress-step ${s.completed ? "completed" : ""}`}
            >
              <div className="circle">{s.completed ? "✓" : i + 1}</div>
              <p>{s.step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Message History */}
      <section className="messages-section">
        <h3>Message History</h3>
        <div className="message-list">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message ${m.from === "CA" ? "ca-message" : "client-message"}`}
            >
              <p className="message-text">{m.text}</p>
              <span className="message-meta">
                {m.from} — {m.date}
              </span>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions">
          <button>View Documents</button>
          <button>Upload New Document</button>
          <button>Call Client</button>
          <button>Mark Task Complete</button>
        </div>
      </section>
    </div>
  );
};

export default ClientProfile;
