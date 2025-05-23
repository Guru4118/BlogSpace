import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import QuickLinks from './QuickLink'; // Assuming QuickLinks is your footer-like component
import { useEffect } from "react"; // Import useEffect

import AOS from 'aos';
import 'aos/dist/aos.css';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
   // Initialize AOS on component mount
    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);

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
    // Outer container: Full screen height, flex column to arrange content + footer, relative for background
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

      {/* 🌸 Gradient Blurred Background: Absolute position to cover the entire container */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

      {/* Main Content Area: Takes up available space, pushing QuickLinks to bottom */}
      {/* IMPORTANT: Changed z-index from z-10 to z-20 here to ensure Navbar and its menu are above QuickLinks */}
      <div className="relative z-20 flex-grow px-4 pt-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* Navbar: Assuming Navbar component itself has internal padding (e.g., py-5) to make it "big" */}
        {/* The Navbar component itself (and its mobile menu) should have a higher z-index if it's not a direct child of this z-20 container */}
        <div className="w-full"> {/* This wrapper ensures Navbar stretches across max-w-7xl and allows its padding */}
           {/* Removed className="py-5" here as it should be applied directly inside Navbar.js */}
           <Navbar /> 
        </div>
        <br />
        {/* Removed <br /> tag, as pt-10 on parent and py-X on Navbar should provide sufficient spacing */}
        
        {/* Login Form Container: Centered vertically within the available space */}
        <div className="flex-grow flex items-center justify-center w-full" data-aos="flip-right"> {/* Use flex-grow to push form to center */}
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
      </div> {/* End of Main Content Area */}

      {/* QuickLinks / Footer: Always at the bottom */}
      {/* QuickLinks remains at z-10, ensuring it's below the z-20 main content area */}
      <div className="relative z-10 w-full">
         <div className="max-w-7xl mx-auto">
            <QuickLinks />
         </div>
      </div>
    </div>
  );
}

export default Login;