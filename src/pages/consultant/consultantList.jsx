import { useEffect, useState } from "react";
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

  /* ---------------- Fetch Consultants ---------------- */
  useEffect(() => {
    const fetchConsultants = async () => {
      const clientId = Number(String(userId).trim());
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/consultant-list/${clientId}`
        );
        setConsultants(response.data);
      } catch (error) {
        setError("Failed to load Consultant list");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  /* ---------------- Handle Connect ---------------- */
  const handleConnect = async (consultant) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/assignments/assign-consultant`,
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

      const data = response.data;

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

  /* ---------------- UI ---------------- */
  return (
    <>
      <Header />

      <section className="bg-slate-50 font-[Inter] text-gray-800 min-h-screen">
        {/* Header */}
        <div className="text-center px-6 py-12">
          <h2 className="text-3xl font-semibold text-slate-800 mb-2">
            Find Consultants
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Connect with trusted consultants for professional guidance,
            business strategy, and expert advice.
          </p>
        </div>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {/* Consultant Cards */}
        <div className="px-6 pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            consultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-white rounded-xl p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={
                      consultant.image ||
                      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    }
                    alt={consultant.name}
                    className="w-[60px] h-[60px] rounded-full object-cover mr-4"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {consultant.name}
                    </h3>
                    <span className="text-amber-500 font-medium text-sm">
                      ⭐ 4.7 / 5
                    </span>
                  </div>
                </div>

                {/* Consultant Info */}
                <div className="text-sm text-slate-600 space-y-1">
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

                {/* Action Button */}
                {consultant.assigned ? (
                  <button
                    disabled
                    className="mt-5 w-full bg-gray-300 text-gray-600 font-medium py-2 rounded-lg cursor-not-allowed"
                  >
                    Connected
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(consultant)}
                    className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors"
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

export default ConsultantList;
