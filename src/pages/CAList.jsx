import React, { useState } from "react";
import "./CAList.css";

const CAList = () => {
  const [selectedCA, setSelectedCA] = useState(null);

  // 🧑‍💼 Sample Data (You can later fetch this from your backend)
  const caList = [
    {
      id: 1,
      name: "Rohit Mehta",
      experience: "8 Years",
      specialization: "Tax Filing & GST",
      rating: 4.8,
      clients: 120,
    },
    {
      id: 2,
      name: "Priya Sharma",
      experience: "5 Years",
      specialization: "Audit & Compliance",
      rating: 4.6,
      clients: 98,
    },
    {
      id: 3,
      name: "Arjun Verma",
      experience: "10 Years",
      specialization: "Startup Accounting & Financial Planning",
      rating: 4.9,
      clients: 140,
    },
    {
      id: 3,
      name: "Arjun Verma",
      experience: "10 Years",
      specialization: "Startup Accounting & Financial Planning",
      rating: 4.9,
      clients: 140,
    },
    {
      id: 3,
      name: "Arjun Verma",
      experience: "10 Years",
      specialization: "Startup Accounting & Financial Planning",
      rating: 4.9,
      clients: 140,
    },
    {
      id: 3,
      name: "Arjun Verma",
      experience: "10 Years",
      specialization: "Startup Accounting & Financial Planning",
      rating: 4.9,
      clients: 140,
    },
  ];

  const handleConnect = (ca) => {
    setSelectedCA(ca);
    alert(`Connection request sent to ${ca.name}`);
  };

  return (
    <section className="ca-list-section">
      <div className="ca-list-header">
        <h2>Available Chartered Accountants</h2>
        <p>
          Choose a CA to assist you with your tax filing, auditing, or compliance
          needs.
        </p>
      </div>

      <div className="ca-card-container">
        {caList.map((ca) => (
          <div className="ca-card" key={ca.id}>
            <div className="ca-info">
              <h3>{ca.name}</h3>
              <p>
                <strong>Experience:</strong> {ca.experience}
              </p>
              <p>
                <strong>Specialization:</strong> {ca.specialization}
              </p>
              <p>
                <strong>Clients Served:</strong> {ca.clients}
              </p>
            </div>

            <div className="ca-meta">
              <span className="ca-rating">⭐ {ca.rating}</span>
              <button
                className="connect-btn"
                onClick={() => handleConnect(ca)}
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCA && (
        <div className="ca-popup">
          <div className="popup-content">
            <h4>Request Sent!</h4>
            <p>
              Your connection request has been sent to{" "}
              <strong>{selectedCA.name}</strong>. You’ll be notified once they
              respond.
            </p>
            <button
              className="close-popup"
              onClick={() => setSelectedCA(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CAList;
