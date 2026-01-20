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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      console.log(data);

      const token = data.token;
      const role = data.role;
      const userId = data.userId;
      const name = data.name;

      // store JWT + role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      // REDIRECT based on role
      if (role === "CA") {
        navigate("/dashboard/ca");
      } else if (role === "USER") {
        navigate("/user/dashboard");
      } else if (role === "LAWYER") {
        navigate("/lawyer/dashboard");
      } else if (role === "CONSULTANT") {
        navigate("/dashboard/consultant");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        {/* Brand */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Legal<span className="text-indigo-400">Help</span>
        </h2>

        <h4 className="text-lg text-center font-medium mt-2">Welcome back!</h4>
        <p className="text-sm text-center text-gray-300 mb-8">
          Login to continue using LegalHelp
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-white shadow-lg"
          >
            Log in
          </button>
        </form>

        {/* Register */}
        <p className="text-sm text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-400 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
