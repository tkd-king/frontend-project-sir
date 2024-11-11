"use client";
import { useState } from "react";
import NavBar from "@/components/molicules/NavBar.jsx";
import Footer from "@/components/organism/Footer.jsx";
import "@/app/globals.css"

const SignUp = () => {
 

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signupError, setSignupError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

 

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");

    // Simple validation
    if (!signupData.name || !signupData.email || !signupData.password) {
      setSignupError("All fields are required!");
      return;
    }

    try {
      // Simulate a successful signup
      setSuccessMessage("Sign up successful!");
      // Reset form
      setSignupData({ name: "", email: "", password: "" });
    } catch (error) {
      setSignupError("Sign up failed!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSignupSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          {signupError && <div className="text-red-500 mb-2">{signupError}</div>}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={signupData.name}
            onChange={handleSignupChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>

        {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
