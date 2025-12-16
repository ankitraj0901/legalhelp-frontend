import React, { useState } from "react";
import axios from "axios";

const Investment = () => {
  const [strategy, setStrategy] = useState("");
  const [formData, setFormData] = useState({
    risk: "",
    expectedReturn: "",
    years: "",
    amount: "",
  });
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        strategy === "stock"
          ? "http://localhost:5000/api/recommend/stocks"
          : "http://localhost:5000/api/recommend/mutual-funds";

      const res = await axios.post(url, formData);
      setResult(res.data.recommendations);
    } catch (err) {
      alert("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Investment Advisor
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Get personalized investment recommendations
        </p>

        {/* Strategy Selector */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Strategy
          </label>
          <select
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Strategy</option>
            <option value="stock">Stocks</option>
            <option value="mutual">Mutual Funds</option>
          </select>
        </div>

        {/* Form */}
        {strategy && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Tolerance
              </label>
              <select
                name="risk"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Risk</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Return (%)
              </label>
              <input
                type="number"
                name="expectedReturn"
                placeholder="e.g. 12"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Duration (Years)
              </label>
              <input
                type="number"
                name="years"
                placeholder="e.g. 5"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="e.g. 100000"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
            >
              {loading ? "Analyzing..." : "Get Recommendation"}
            </button>
          </form>
        )}

        {/* Result */}
        {result.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Recommended {strategy === "stock" ? "Stocks" : "Mutual Funds"}
            </h3>
            <ul className="space-y-2">
              {result.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Investment;
