import React, { useState } from "react";
import "../styles/chairCard.css";

const ChairCard = ({ chair }) => {
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    // Add your booking logic here
    console.log(`Booking chair: ${chair.name}`);
  };

  // Calculate discount if both hourly and daily rates exist
  const hourlyTotal = chair.pricePerHour * 8; // 8 hours in a day
  const discount = hourlyTotal > chair.pricePerDay 
    ? Math.round(((hourlyTotal - chair.pricePerDay) / hourlyTotal) * 100)
    : 0;

  return (
    <div className="chair-card">
      {/* Chair Details */}
      <div className="chair-content">
        <h3>{chair.name}</h3>
        
        <div className="chair-type">
          <span className="type-badge">{chair.type}</span>
        </div>

        <div className="location-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="10" r="3"/>
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
          </svg>
          <span>{chair.location.address}</span>
        </div>

        {/* Pricing Section */}
        <div className="pricing-section">
          <div className="price-item">
            <span className="price-label">Per Hour</span>
            <span className="price">₹{chair.pricePerHour}</span>
          </div>
          <div className="price-item featured">
            <span className="price-label">Per Day</span>
            <div className="price-group">
              <span className="price">₹{chair.pricePerDay}</span>
              {discount > 0 && (
                <>
                  <span className="original-price">₹{hourlyTotal}</span>
                  <span className="discount-badge">{discount}% OFF</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features-section">
          <h4>Features</h4>
          <div className="features-list">
            {chair.features.map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Rating (if available) */}
        {chair.rating && (
          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(chair.rating) ? 'filled' : ''}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {chair.rating} ({chair.reviewCount || 0} reviews)
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          
          <button className="btn btn-primary" onClick={handleBookNow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChairCard;