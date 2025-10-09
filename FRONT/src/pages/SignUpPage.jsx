import React, { useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  // ---------- Form State ----------
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // ---------- Form Submission ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      alert("Please agree to the terms");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/user/", formData);
      alert("User account created successfully!");
      navigate("/"); // ✅ Redirect to Home after signup
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">
          {/* Left Panel */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 to-pink-500 text-white flex-col justify-center items-center text-center p-8">
            <img
              src="./src/assets/logo.png"
              alt="Saviya Logo"
              className="w-20 h-20 rounded-2xl shadow-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-4">SAVIYA</h1>
            <h2 className="text-xl mb-2">Join Our Community!</h2>
            <p className="max-w-sm text-sm mb-6">
              Sign up to connect with care homes, schools, and sponsors. Start making a difference today.
            </p>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10 bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold">Sign Up</h2>
                <p className="text-gray-500 text-sm">
                  Create your account to start helping or receiving support
                </p>

                {/* User Fields */}
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none mb-2"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none mb-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none mb-2"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none mb-2"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none mb-2"
                />

                <label className="flex items-center gap-2 text-gray-700 text-sm">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="w-4 h-4 accent-purple-600"
                  />
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-800 transition"
                >
                  Sign Up
                </button>

                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <a
                    href="/signin"
                    className="text-purple-600 font-medium hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUpPage;
