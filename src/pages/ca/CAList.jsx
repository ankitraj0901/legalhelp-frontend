import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./CAList.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const clientId = Number(String(userId).trim());
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/ca-list/${clientId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();
        console.log(data);
        setCaList(data);
      } catch (error) {
        setError("Failed to Load CA list", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCAs();
  }, []);

  // handle function to establish connection between CA and user
  const handleConnect = async (ca) => {
    // setSelectedCA(ca);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/assignments/assign-ca`,
        {
          clientId: userId,
          professionalId: ca.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = response.data;

      if (data.existing) {
        toast.warning("You are already connected with this Lawyer.");
      } else {
        toast.success("Lawyer connected successfully!");
      }
      navigate("/user/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error Connecting to CA ! Try again.");
    }
  };

  return (
    <>
      <Header></Header>
      <section className="ca-list-section">
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
          {!loading &&
            !error &&
            caList &&
            caList.map((ca) => (
              <div className="ca-card" key={ca.id}>
                <div className="ca-card-header">
                  <img
                    src={
                      ca.image ||
                      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    }
                    alt={ca.name}
                    className="ca-avatar"
                  />
                  <div className="ca-info-header">
                    <h3>{ca.name}</h3>
                    <span className="ca-rating">⭐ {4.5} / 5</span>
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

                {/* <button className="connect-btn" onClick={() => handleConnect(ca)}>
                Connect Now
              </button> */}

                {ca.assigned ? (
                  <button className="connected-btn" disabled>
                    Connected
                  </button>
                ) : (
                  <button
                    className="connect-btn"
                    onClick={() => handleConnect(ca)}
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
        </div>

        {selectedCA && (
          <div className="ca-popup">
            <div className="popup-content">
              <h4>Request Sent Successfully</h4>
              <p>
                Your request has been sent to <strong>{selectedCA.name}</strong>
                . They will reach out to you shortly.
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
    </>
  );
};

export default CAList;
