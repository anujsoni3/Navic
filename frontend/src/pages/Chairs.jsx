import React, { useEffect, useState } from "react";
import { getChairs } from "../api"; // Assumes api.js is in src
import ChairCard from "../components/ChairCard";
import "../styles/chairCard.css"; // Optional: for styling if needed

const Chairs = () => {
  const [chairs, setChairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChairs = async () => {
      const data = await getChairs();
      setChairs(data);
      setLoading(false);
    };

    fetchChairs();
  }, []);

  return (
    <div className="chair-page">
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Available Wheelchairs</h2>
      
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading chair rentals...</p>
      ) : chairs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No chair rentals available at the moment.</p>
      ) : (
        <div className="chair-card-container" style={styles.cardContainer}>
          {chairs.map((chair) => (
            <ChairCard key={chair._id} chair={chair} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "30px",
  },
};

export default Chairs;
