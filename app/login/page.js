"use client";
import { useState } from "react";
import NavBar from "@/components/molicules/NavBar.jsx";
import Footer from "@/components/organism/Footer.jsx";
import "@/app/globals.css"
import { UniformContextProvider } from "@/context/UniformContextProvider";
import RoutedPath from "@/components/atoms/RoutedPath";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

 

  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    
    // Simple validation
    if (!loginData.email || !loginData.password) {
      setLoginError("Email and password are required!");
      return;
    }

    try {
      // Simulate a successful login
      setSuccessMessage("Login successful!");
      // Reset form
      setLoginData({ email: "", password: "" });
    } catch (error) {
      setLoginError("Login failed!");
    }
  };

 

  return (
    <>
  <UniformContextProvider>
      <NavBar />
  <RoutedPath page={`Log in`} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-md">
          {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>

        {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
      </div>
      <Footer />
    </UniformContextProvider>
    </>
  );
};

export default Login;
