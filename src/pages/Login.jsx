import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);

      if (data.role === "CA") navigate("/dashboard/ca");
      else if (data.role === "USER") navigate("/user/dashboard");
      else if (data.role === "LAWYER") navigate("/lawyer/dashboard");
      else if (data.role === "CONSULTANT") navigate("/dashboard/consultant");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff] flex items-center justify-center px-4">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-300/40 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-300/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] left-1/3 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[120px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Legal<span className="text-indigo-600">Help</span>
          </h2>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Welcome back!
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1 mb-8">
          Login to continue using LegalHelp
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 transition font-semibold text-white shadow-md"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
