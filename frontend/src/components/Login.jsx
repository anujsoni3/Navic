import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Keep if your backend sets httpOnly cookies
      });

      if (response.ok) {
        const data = await response.json();

        // 🔑 Store the token from backend response
        localStorage.setItem("token", data.token); // Store JWT or session token

        // Optionally, you can store other user info as well
        // localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/Check_Rentals"); // Navigate to homepage after login
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="max-w-sm mx-auto bg-white rounded-lg p-6 shadow-md font-spartan text-black"
        style={{ fontFamily: "'Spartan', sans-serif" }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc295]"
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc295]"
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

          <div className="mb-6 text-right">
            <a
              href="/forgot-password"
              className="text-[#2cc295] text-sm hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2cc295] text-white py-2 rounded font-semibold hover:bg-[#26a17f] transition"
          >
            Sign In
          </button>

          <Link
            to="/register"
            className="mt-3 text-gray-500 text-xs text-center block hover:underline"
          >
            Create an account
          </Link>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">or sign in with</span>
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
          <span className="text-black font-semibold">Sign in with Google</span>
        </button>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default Login;
