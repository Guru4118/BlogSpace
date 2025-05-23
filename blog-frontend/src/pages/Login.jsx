import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("https://blogspace-b5td.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-pink-500 via-white to-pink-100 p-3 pt-12 ">
      {/* Row-wise navbar at top */}
      <Navbar />

      {/* Form centered only on md+ screens */}
      <div className="md:flex md:items-center md:justify-center md:h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-md mt-8 md:mt-0 mx-auto">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-6 text-gray-600">
            New User?{" "}
            <Link to="/register" className="text-pink-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
