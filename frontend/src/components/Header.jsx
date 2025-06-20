import React, { useState, useEffect, useRef } from "react";
import person from "../assets/person.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Directly navigate to login if not logged in
    } else {
      setDropdownOpen(!dropdownOpen); // Toggle dropdown if logged in
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="text-white flex justify-between mx-[40px]">
      <Link to="/" className="font-gothic text-white text-5xl mt-[15px]">
        NAVIC
      </Link>

      <div className="flex font-spartan font-white gap-12 mt-[35px] mr-[25px]">
        <a href="">ABOUT</a>
        <a href="">PRICING</a>
        <a href="">REVIEW</a>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className="bg-white rounded-full flex justify-center items-center w-[40px] h-[40px] mt-[20px] cursor-pointer"
          onClick={handleProfileClick}
        >
          <img src={person} alt="Profile" className="w-[20px] h-[20px]" />
        </div>

        {isLoggedIn && dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-2 z-10">
            <button
              onClick={() => navigate("/profile")}
              className="block text-black w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block text-black w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
