// Updated Rentals.js
import React, { useEffect, useState } from "react";
import { getRentals } from "../api";
import RentalCard from "../components/RentalCard";
import "../styles/Rentals.css";
import { useNavigate } from "react-router-dom";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Luxury");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching rentals...");
        const data = await getRentals();
        console.log("Received data:", data);
        setRentals(data);
      } catch (err) {
        console.error("Error fetching rentals:", err);
        setError("Failed to fetch rentals");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectDealer = (dealer) => {
    const dealerEmail = dealer.contact?.email || "";
    const carModel = dealer.vehicles?.[0] || "";
    console.log("Dealer selected:", dealer);
    navigate("/form", {
      state: { dealerEmail, carModel },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Search submitted");
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "WheelChair") {
      navigate("/chairs");
    }
  };

  // Wheelchair SVG Icon Component
  const WheelchairIcon = ({ className, onClick }) => (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 8v4" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="18" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M16 14l2-2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 16l-2 2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="rentals-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          

          <h1 className="hero-title">
            Rent the Perfect<br />
            Car for Your Next Journey
          </h1>
          <p className="hero-subtitle">
            Affordable, reliable, and fast bookings.
          </p>
          
          {/* Category Tabs */}
          <div className="category-tabs">
            {["Economy", "Luxury", "SUVs"].map((category) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
            {/* Special Wheelchair Tab with Icon */}
            <button
              className={`category-tab wheelchair-tab ${activeCategory === "WheelChair" ? "active" : ""}`}
              onClick={() => handleCategoryChange("WheelChair")}
              style={styles.wheelchairTab}
            >
              <WheelchairIcon className="tab-icon" />
              WheelChair
            </button>
          </div>
        </div>
      </section>

      

      {/* Rentals List Section */}
      <section className="rentals-list-section">
        <h2>Available Dealers</h2>
        
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        
        <div className="rentals-list">
          {rentals.length > 0 ? (
            rentals.map((rental) => (
              <div 
                key={rental._id} 
                onClick={() => handleSelectDealer(rental)} 
                style={{ cursor: "pointer" }}
              >
                <RentalCard rental={rental} />
              </div>
            ))
          ) : (
            !loading && !error && <p>No dealers found</p>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  floatingLink: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px 15px",
    borderRadius: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 1000,
  },
  linkText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    cursor: "pointer",
  },
  wheelchairTab: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  banner: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    border: "2px dashed #e9ecef",
  },
  bannerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  bannerButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
};

export default Rentals;