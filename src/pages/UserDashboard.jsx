import React from "react";
import { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  const user = {
    name: "Ankit",
    nextAction: { label: "Review Draft ITR", status: "Pending Action" },
    ca: {
      assigned: true,
      name: "CA Rahul Verma",
      photo: "https://via.placeholder.com/60",
      lastUpdate: "Nov 5, 2025",
      summary: "Reviewed your FY 2024 ITR draft.",
    },
    recentDocs: [
      "Form 16.pdf",
      "Aadhaar Card.pdf",
      "Filed ITR-1 Acknowledgement.pdf",
    ],
  };

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    const fileNames = Array.from(files).map((file) => file.name);
    setUploadedFiles((prev) => [...prev, ...fileNames]);
    setFiles([]);
    alert("Files uploaded successfully!");
  };


  return (
    <div className="dashboard-container">
      {/* A. Header */}
      <header className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's what's happening today 👇</p>
      </header>

      {/* B. Quick Status Widget */}
      <section className="status-widget">
        <div className="status-info">
          <h2>Next Action:</h2>
          <p className="status-label">{user.nextAction.label}</p>
        </div>
        <span
          className={`status-badge ${
            user.nextAction.status === "Pending Action"
              ? "badge-red"
              : "badge-blue"
          }`}
        >
          {user.nextAction.status}
        </span>
      </section>

      {/* C. Primary CTAs */}
      <section className="cta-section">
        <button className="cta-btn cta-blue">File My Taxes Now</button>
        <button className="cta-btn cta-green">
          {user.ca.assigned ? "Connect with My CA" : "Find a CA"}
        </button>
      </section>

      {/* D. Service Timeline */}
      <section className="timeline-section">
        <h2>ITR Filing Progress</h2>
        <div className="timeline">
          {["Docs Uploaded", "Verification", "E-Filing"].map((step, index) => (
            <div key={index} className="timeline-step">
              <div
                className={`circle ${index < 2 ? "completed" : ""}`}
              >
                {index < 2 ? "✓" : index + 1}
              </div>
              <p>{step}</p>
              {index < 2 && <div className="line"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* E. CA Support Status */}
      <section className="ca-support">
        <img src={user.ca.photo} alt="CA" className="ca-photo" />
        <div className="ca-info">
          <h3>{user.ca.name}</h3>
          <p>
            Last update on {user.ca.lastUpdate}: {user.ca.summary}
          </p>
        </div>
        <div className="ca-actions">
          <button className="btn chat-btn">Chat</button>
          <button className="btn call-btn">Call</button>
        </div>
      </section>

      {/* F. AI Tool Access */}
      <section className="ai-tools">
        <h2>AI Tool Access</h2>
        <div className="tool-cards">
          <div className="tool-card blue">
            <h3>Tax Predictor</h3>
            <p>Explore now →</p>
          </div>
          <div className="tool-card green">
            <h3>Deduction Optimizer</h3>
            <p>Explore now →</p>
          </div>
          <div className="tool-card yellow">
            <h3>Compliance Check</h3>
            <p>Explore now →</p>
          </div>
        </div>
      </section>

      {/* === Document Upload Section === */}
      <div className="document-upload">
        <h2>Upload Documents</h2>
        <form className="upload-form" onSubmit={handleUpload}>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="file-input"
          />
          <button type="submit" className="upload-btn">Upload</button>
        </form>

        <div className="uploaded-files">
          {/* <h3>Uploaded Files</h3> */}
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* G. Recent Documents */}
      <section className="recent-docs">
        <h2>Recent Documents</h2>
        <ul>
          {user.recentDocs.map((doc, i) => (
            <li key={i}>
              <span>{doc}</span>
              <button className="view-btn">View</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UserDashboard;
