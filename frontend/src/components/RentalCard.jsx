import React from "react";
import "../styles/RentalCard.css";

const RentalCard = ({ rental }) => {
  // Helper function to split vehicles into tags
  const renderVehicleTags = (vehicles) => {
    return vehicles.map((vehicle, index) => (
      <span key={index} className="vehicle-tag">
        {vehicle}
      </span>
    ));
  };

  // Helper function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <span className="stars">
        {'★'.repeat(fullStars)}
        {hasHalfStar ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="rental-card">
      {/* Optional: Add bookmark button */}
      <button className="bookmark-btn" title="Save to favorites">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Header Section */}
      <div className="rental-header">
        <h3>{rental.name}</h3>
        <div className="rental-type">
          <span className="type-badge">{rental.type}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="rental-content">
        <div className="rental-info">
          <p><strong>Type:</strong> {rental.type}</p>
          <p><strong>Location:</strong> {rental.location.address}</p>
        </div>

        {/* Vehicles Section */}
        <div className="vehicles-section">
          <p><strong>Vehicles:</strong></p>
          <div className="vehicles-list">
            {renderVehicleTags(rental.vehicles)}
          </div>
        </div>

        {/* Rating Section */}
        <div className="rating-section">
          <div className="rating">
            {renderStars(rental.ratings.average)}
            <span className="rating-number">{rental.ratings.average}</span>
            <span className="rating-text">
              ({rental.ratings.total_reviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="rental-actions">
        <a href={rental.booking_url} target="_blank" rel="noopener noreferrer">
          Book Now
        </a>
      </div>
    </div>
  );
};

export default RentalCard;