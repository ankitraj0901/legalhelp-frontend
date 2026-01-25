import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CAList = () => {
  const [selectedCA, setSelectedCA] = useState(null);
  const [caList, setCaList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  /* ---------------- Fetch CA List ---------------- */
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
          }
        );

        const data = await response.json();
        setCaList(data);
      } catch (error) {
        setError("Failed to Load CA list");
      } finally {
        setLoading(false);
      }
    };

    fetchCAs();
  }, []);

  /* ---------------- Handle Connect ---------------- */
  const handleConnect = async (ca) => {
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
        }
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

  /* ---------------- UI ---------------- */
  return (
    <>
      <Header />

      <section className="bg-slate-50 font-[Inter] text-gray-800 min-h-screen">
        {/* Header */}
        <div className="text-center px-6 py-12">
          <h2 className="text-3xl font-semibold text-slate-800 mb-2">
            Find Your Chartered Accountant
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Connect with verified professionals for tax advice, audits, and
            financial planning. Simplify your accounting needs today.
          </p>
        </div>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-gray-500">Loading CA list...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {/* CA Cards */}
        <div className="px-6 pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            caList &&
            caList.map((ca) => (
              <div
                key={ca.id}
                className="bg-white rounded-xl p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={
                      ca.image ||
                      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    }
                    alt={ca.name}
                    className="w-15 h-15 w-[60px] h-[60px] rounded-full object-cover mr-4"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {ca.name}
                    </h3>
                    <span className="text-amber-500 font-medium text-sm">
                      ⭐ 4.5 / 5
                    </span>
                  </div>
                </div>

                {/* CA Info */}
                <div className="text-sm text-slate-600 space-y-1">
                  <p>
                    <strong>Email:</strong> {ca.email}
                  </p>
                  <p>
                    <strong>Experience:</strong> {ca.experience}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {ca.specialization}
                  </p>
                </div>

                {/* Action Button */}
                {ca.assigned ? (
                  <button
                    disabled
                    className="mt-5 w-full bg-gray-300 text-gray-600 font-medium py-2 rounded-lg cursor-not-allowed"
                  >
                    Connected
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(ca)}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
        </div>

        {/* Popup */}
        {selectedCA && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-sm text-center shadow-xl">
              <h4 className="text-lg font-semibold mb-2">
                Request Sent Successfully
              </h4>
              <p className="text-gray-600">
                Your request has been sent to{" "}
                <strong>{selectedCA.name}</strong>. They will reach out to you
                shortly.
              </p>
              <button
                onClick={() => setSelectedCA(null)}
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-md transition-colors"
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
