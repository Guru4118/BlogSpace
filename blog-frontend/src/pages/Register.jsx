import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import QuickLinks from './QuickLink'; // Assuming QuickLinks is your footer-like component
import AOS from 'aos';
import 'aos/dist/aos.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://blogspace-b5td.onrender.com/api/auth/register", {
        username,
        email,
        password,
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/"); // Navigate to the login page after successful registration
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    // Outer container: Full screen height, flex column to arrange content + footer, relative for background
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

      {/* 🌸 Gradient Blurred Background: Absolute position to cover the entire container */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

      {/* Main Content Area: Takes up available space, pushing QuickLinks to bottom */}
      {/* Added pt-10 for overall top padding for the content area, matching Home and Login */}
      {/* Increased z-index for this main content area to ensure Navbar (and its menu) is above QuickLinks */}
      <div className="relative z-20 flex-grow px-4 pt-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* Navbar: Assuming Navbar component itself has internal padding (e.g., py-5) to make it "big" */}
        {/* If Navbar doesn't accept className prop, you'd modify Navbar.js directly to add py-X */}
        {/* The Navbar component itself (and its mobile menu) should have a higher z-index if it's not a direct child of this z-20 container */}
        <div className="w-full"> {/* This wrapper ensures Navbar stretches across max-w-7xl and allows its padding */}
          <Navbar /> 
        </div>
        <br />
        {/* Removed <br /> tags, as pt-10 on parent and py-X on Navbar should provide sufficient spacing */}
        
        {/* Register Form Container: Centered vertically within the available space */}
        <div className="flex-grow flex items-center justify-center w-full"> {/* Use flex-grow to push form to center */}
            <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-md mt-8 md:mt-0 mx-auto" data-aos='flip-left'>
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
      </div> {/* End of Main Content Area */}

      {/* QuickLinks / Footer: Always at the bottom */}
      {/* This div is outside the main content area to allow flex-grow to push it down */}
      {/* Set QuickLinks to z-10, lower than the main content area's z-20 */}
      <div className="relative z-10 w-full"> {/* Ensure it's above the background and spans full width */}
         <div className="max-w-7xl mx-auto"> {/* Centered content within QuickLinks */}
            <QuickLinks />
         </div>
      </div>
    </div>
  );
}

export default Register;