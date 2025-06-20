import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile");  // Redirect to profile page after signup
      } else {
        setErrorMsg(data.message || "Signup failed");
      }
    } catch (error) {
      setErrorMsg("Server error. Try again later.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="max-w-sm mx-auto bg-white rounded-lg p-6 shadow-md font-spartan text-black"
        style={{ fontFamily: "'Spartan', sans-serif" }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="mb-4 text-red-600 text-center">{errorMsg}</div>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc295]"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc295]"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc295]"
            />
          </div>

          <div className="mb-4 text-sm text-[#2cc295] text-center">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-[#28b386]">
              Sign in
            </a>
          </div>
          <Link to="/Check_Rentals" className="block text-center mb-4 text-sm text-[#2cc295] hover:text-[#28b386]">
          <button
            type="submit"
            
            className="w-full bg-[#2cc295] text-white py-2 rounded font-semibold hover:bg-[#26a17f] transition"
          >
            Sign Up
          </button>
          </Link>

        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-black font-semibold">Sign up with Google</span>
        </button>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default Registration;
