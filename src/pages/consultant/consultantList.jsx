import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConsultants = async () => {
      const clientId = Number(String(userId).trim());
      try {
        const response = await axios.get(
          `http://localhost:8080/user/consultant-list/${clientId}`
        );
        console.log(response);
        setConsultants(response.data);
      } catch (error) {
        setError("Failed to load Consultant list");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  const handleConnect = async (consultant) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/assignments/assign-consultant",
        {
          clientId: userId,
          professionalId: consultant.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      //extracting the response from backend
      const data = response.data;
      console.log("Response data: ", data);
      
      if (data.existing) {
        toast.warning("You are already connected with this Lawyer.");
      } else {
        toast.success("Lawyer connected successfully!");
      }
      
      navigate("/user/dashboard");
      
    } catch (error) {
      alert("Error connecting to Consultant");
    }
  };

  return (
    <>
    <Header/>
    <section className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Find Consultants</h2>
          <p className="text-gray-600">
            Connect with trusted consultants for professional guidance, business
            strategy, and expert advice.
          </p>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading &&
            !error &&
            consultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      consultant.image ||
                      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    }
                    className="w-16 h-16 rounded-full border"
                    alt="consultant"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {consultant.name}
                    </h3>
                    <p className="text-yellow-500 text-sm">⭐ 4.7 / 5</p>
                  </div>
                </div>

                <div className="mt-4 text-gray-700 space-y-1">
                  <p>
                    <strong>Email:</strong> {consultant.email}
                  </p>
                  <p>
                    <strong>Experience:</strong> {consultant.experience}
                  </p>
                  <p>
                    <strong>Domain:</strong> {consultant.domain}
                  </p>
                </div>

                {/* <button
                  onClick={() => handleConnect(consultant)}
                  className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all"
                >
                  Connect Now
                </button> */}

                  {/* showing connect button based on assigned condition */}
                {consultant.assigned ? (
                  <button className="connected-btn" disabled>
                    Connected
                  </button>
                ) : (
                  <button
                    className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all"
                    onClick={() => handleConnect(consultant)}
                  >
                    Connect
                  </button>
                )}


              </div>
            ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default ConsultantList;
