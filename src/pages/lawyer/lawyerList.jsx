import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  /* ---------------- Fetch Lawyers ---------------- */
  useEffect(() => {
    const fetchLawyers = async () => {
      const clientId = Number(String(userId).trim());
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/lawyer-list/${clientId}`
        );
        setLawyers(response.data);
      } catch (error) {
        setError("Failed to load Lawyer list");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  /* ---------------- Handle Connect ---------------- */
  const handleConnect = async (lawyer) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/assignments/assign-lawyer`,
        {
          clientId: userId,
          professionalId: lawyer.userId,
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
      alert("Error connecting to Lawyer");
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
            Find Lawyers
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Connect with top-rated lawyers for legal help, case handling, and
            consultation.
          </p>
        </div>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {/* Lawyer Cards */}
        <div className="px-6 pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            lawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-xl p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={
                      lawyer.image ||
                      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    }
                    alt={lawyer.name}
                    className="w-[60px] h-[60px] rounded-full object-cover mr-4"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {lawyer.name}
                    </h3>
                    <span className="text-amber-500 font-medium text-sm">
                      ⭐ 4.6 / 5
                    </span>
                  </div>
                </div>

                {/* Lawyer Info */}
                <div className="text-sm text-slate-600 space-y-1">
                  <p>
                    <strong>Email:</strong> {lawyer.email}
                  </p>
                  <p>
                    <strong>Experience:</strong> {lawyer.experience}
                  </p>
                  <p>
                    <strong>Practice Area:</strong> {lawyer.practiceArea}
                  </p>
                </div>

                {/* Action Button */}
                {lawyer.assigned ? (
                  <button
                    disabled
                    className="mt-5 w-full bg-gray-300 text-gray-600 font-medium py-2 rounded-lg cursor-not-allowed"
                  >
                    Connected
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(lawyer)}
                    className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default LawyerList;
