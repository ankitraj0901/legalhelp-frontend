// pages/TaxPredictorForm.jsx
import { useState } from "react";
import axios from "axios";

export default function TaxPredictor() {
  const [formData, setFormData] = useState({
    salary: "",
    hra: "",
    lta: "",
    invest_80C: "",
    invest_80D: "",
    home_loan_interest: "",
    rent_paid: "",
    other_income: "",
    standard_deduction: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/user/dashboard/tax-prediction",
        formData
      );
      setResult(res.data);
    } catch (err) {
      alert("Error predicting tax");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Income Tax Predictor (New Tax Regime)
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {[
            ["salary", "Annual Salary"],
            ["hra", "HRA"],
            ["lta", "LTA"],
            ["invest_80C", "80C Investments"],
            ["invest_80D", "80D Investments"],
            ["home_loan_interest", "Home Loan Interest"],
            ["rent_paid", "Rent Paid"],
            ["other_income", "Other Income"],
            ["standard_deduction", "Standard Deduction"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <input
                type="number"
                name={name}
                required
                value={formData[name]}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl
                         hover:bg-blue-700 transition font-semibold"
            >
              {loading ? "Predicting..." : "Predict Tax"}
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-green-700">
              Prediction Result
            </h3>
            <p className="mt-2 text-gray-700">
              <strong>Taxable Income:</strong> ₹{result.taxable_income}
            </p>
            <p className="text-gray-700">
              <strong>Final Tax Payable:</strong> ₹{result.final_tax_payable}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
