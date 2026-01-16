import { useState } from "react";
import axios from "axios";

export default function TaxOptimization() {
  const [form, setForm] = useState({
    current_tax: "",
    regime: "OLD",
    age: "",
    invest_80C: "",
    invest_80D: "",
    home_loan_interest: "",
    hra_claimed: false,
    has_employer_nps: false,
    salary: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        current_tax: Number(form.current_tax),
        regime: form.regime,
        age: Number(form.age)
      };

      if (form.regime === "OLD") {
        payload.invest_80C = Number(form.invest_80C || 0);
        payload.invest_80D = Number(form.invest_80D || 0);
        payload.home_loan_interest = Number(form.home_loan_interest || 0);
        payload.hra_claimed = form.hra_claimed;
      } else {
        payload.salary = Number(form.salary || 0);
        payload.has_employer_nps = form.has_employer_nps;
      }

      const res = await axios.post(
        "http://localhost:5000/optimize-tax",
        payload
      );

      setResult(res.data);
    } catch {
      setError("Failed to fetch tax optimization suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Tax Optimization
        </h2>
        <p className="text-gray-600 mb-6">
          Get personalized tax-saving suggestions based on your details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="current_tax"
              placeholder="Current Tax (₹)"
              value={form.current_tax}
              onChange={handleChange}
              required
              className="input"
            />

            <select
              name="regime"
              value={form.regime}
              onChange={handleChange}
              className="input"
            >
              <option value="OLD">Old Tax Regime</option>
              <option value="NEW">New Tax Regime</option>
            </select>

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* OLD REGIME */}
          {form.regime === "OLD" && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h4 className="font-semibold text-gray-700">
                Old Regime Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="number"
                  name="invest_80C"
                  placeholder="80C Investment (₹)"
                  value={form.invest_80C}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="number"
                  name="invest_80D"
                  placeholder="80D Investment (₹)"
                  value={form.invest_80D}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="number"
                  name="home_loan_interest"
                  placeholder="Home Loan Interest (₹)"
                  value={form.home_loan_interest}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="hra_claimed"
                  checked={form.hra_claimed}
                  onChange={handleChange}
                />
                HRA already claimed
              </label>
            </div>
          )}

          {/* NEW REGIME */}
          {form.regime === "NEW" && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h4 className="font-semibold text-gray-700">
                New Regime Details
              </h4>

              <input
                type="number"
                name="salary"
                placeholder="Annual Salary (₹)"
                value={form.salary}
                onChange={handleChange}
                className="input"
              />

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="has_employer_nps"
                  checked={form.has_employer_nps}
                  onChange={handleChange}
                />
                Employer contributes to NPS (80CCD(2))
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Optimizing..." : "Get Tax Optimization Tips"}
          </button>
        </form>

        {/* Result */}
        {error && (
          <p className="text-red-600 mt-4 text-sm">{error}</p>
        )}

        {result && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">
              Optimization Result
            </h3>
            <p>Current Tax: ₹{result.current_tax}</p>
            <p>Optimized Tax: ₹{result.optimized_tax_estimate}</p>
            <p>Estimated Saving: ₹{result.estimated_tax_saving}</p>

            <ul className="mt-3 list-disc list-inside text-sm">
              {result.suggestions.map((s, i) => (
                <li key={i}>
                  <b>{s.section || s.title}:</b> {s.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tailwind input shortcut */}
      <style>
        {`
          .input {
            @apply w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
          }
        `}
      </style>
    </div>
  );
}
