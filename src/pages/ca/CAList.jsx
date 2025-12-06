import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./CAList.css";
import axios from "axios";

const CAList = () => {
  const [selectedCA, setSelectedCA] = useState(null);
  const [caList, setCaList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  //Extracting 
  const userId = localStorage.getItem("userId");


  //fetch the CA from backend api 
  useEffect(() => {
    const fetchCAs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ca/list");
        setCaList(response.data);
      }catch(error) {
        setError("Failed to Load CA list");
      }finally{
        setLoading(false);
      }
    };
    fetchCAs();

  },[]);





  // Sample data (would later be fetched from backend)
  // const caList = [
  //   {
  //     id: 1,
  //     name: "Rohit Mehta",
  //     experience: "8 Years",
  //     specialization: "Tax Filing & GST",
  //     rating: 4.8,
  //     clients: 120,
  //     image: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=", // Optional placeholder image
  //   }
  // ];

  // handle function to establish connection between CA and user
  const handleConnect = async (ca) => {
    // setSelectedCA(ca);
    const userId = localStorage.getItem("userId");
    try{
      const response = await axios.post("http://localhost:8080/assignments/assign-ca",
      {
        clientId: userId,
        professionalId: ca.userId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
      const assignmentId = response.data.assignmentId;
      navigate("/dashboard/user");
      alert("Connected to CA!");


    }
    catch(error) {
      console.error(error);
      alert("Error Connecting to CA ! Try again.");
      
    }
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

      {/* Extracting details of Ca from the Returned List */}
      {loading && <p className="loading">Loading CA list...</p>}
      {error && <p className="error">{error}</p>}

      <div className="ca-card-container">
        {!loading&&
          !error &&
          caList.map((ca) => (
          <div className="ca-card" key={ca.id}>
            <div className="ca-card-header">
              <img
                  src={
                    ca.image ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg"
                  }
                  alt={ca.name}
                  className="ca-avatar"
                />
              <div className="ca-info-header">
                <h3>{ca.name}</h3>
                <span className="ca-rating">
                  ⭐ {4.5} / 5
                </span>
              </div>
            </div>

            <div className="ca-info">
              <p>
                <strong>Email:</strong> {ca.email} 
              </p>
              <p>
                <strong>Experience:</strong> {ca.experience}
              </p>
              <p>
                <strong>Specialization:</strong> {ca.specialization}
              </p>
              {/* <p>
                <strong>Clients Served:</strong> {ca.clients}+ 
              </p> */}
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
