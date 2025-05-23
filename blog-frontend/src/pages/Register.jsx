import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Login from"./Login";
import Navbar from "../components/Navbar";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-pink-500 via-white to-pink-100 p-3 pt-5 ">
          {/* Row-wise navbar at top */}
          <Navbar />
    
    <div className=" md:flex md:items-center md:justify-center md:h-[calc(100vh-80px)] p-4">
      
      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-md mt-8 md:mt-0 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already registered?{" "}
          <Link to="/" className="text-pink-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Register;
