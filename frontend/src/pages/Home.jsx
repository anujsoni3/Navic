import React, { useEffect, useState } from "react";
import { getRentals } from "../../api";
import RentalCard from "../components/RentalCard";

const Home = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    getRentals().then((data) => setRentals(data));
  }, []);

  return (
    <div>
      <h1>Available Rentals</h1>
      <div className="rental-list">
        {rentals.map((rental, index) => (
          <RentalCard key={index} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default Home;
