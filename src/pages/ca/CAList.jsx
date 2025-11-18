import React, { useState } from "react";
import Header from "../../components/Header";
import "./CAList.css";

const CAList = () => {
  const [selectedCA, setSelectedCA] = useState(null);

  // Sample data (would later be fetched from backend)
  const caList = [
    {
      id: 1,
      name: "Rohit Mehta",
      experience: "8 Years",
      specialization: "Tax Filing & GST",
      rating: 4.8,
      clients: 120,
      image: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=", // Optional placeholder image
    },
    {
      id: 2,
      name: "Priya Sharma",
      experience: "5 Years",
      specialization: "Audit & Compliance",
      rating: 4.6,
      clients: 98,
      image: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    {
      id: 3,
      name: "Arjun Verma",
      experience: "10 Years",
      specialization: "Startup Accounting & Financial Planning",
      rating: 4.9,
      clients: 140,
      image: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
  ];

  const handleConnect = (ca) => {
    setSelectedCA(ca);
  };

  return (
    <section className="ca-list-section">
      <Header></Header>
      <div className="ca-list-header">
        
        <h2>Find Your Chartered Accountant</h2>
        <p>
          Connect with verified professionals for tax advice, audits, and
          financial planning. Simplify your accounting needs today.
        </p>
      </div>

      <div className="ca-card-container">
        {caList.map((ca) => (
          <div className="ca-card" key={ca.id}>
            <div className="ca-card-header">
              <img src={ca.image} alt={ca.name} className="ca-avatar" />
              <div className="ca-info-header">
                <h3>{ca.name}</h3>
                <span className="ca-rating">
                  ⭐ {ca.rating.toFixed(1)} / 5
                </span>
              </div>
            </div>

            <div className="ca-info">
              <p>
                <strong>Experience:</strong> {ca.experience}
              </p>
              <p>
                <strong>Specialization:</strong> {ca.specialization}
              </p>
              <p>
                <strong>Clients Served:</strong> {ca.clients}+ 
              </p>
            </div>

            <button className="connect-btn" onClick={() => handleConnect(ca)}>
              Connect Now
            </button>
          </div>
        ))}
      </div>

      {selectedCA && (
        <div className="ca-popup">
          <div className="popup-content">
            <h4>Request Sent Successfully</h4>
            <p>
              Your request has been sent to <strong>{selectedCA.name}</strong>.
              They will reach out to you shortly.
            </p>
            <button className="close-popup" onClick={() => setSelectedCA(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CAList;
