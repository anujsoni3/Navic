import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getRentals = async () => {
  try{const response = await api.get("/rentals");
  return response.data;
} catch (error) {
  console.error("Error fetching rentals:", error);
  return []; // Return empty array to prevent breaking the frontend
}

};

export const getChairs = async () => {
  try {
    const response = await api.get("/chair");
    return response.data;
  } catch (error) {
    console.error("Error fetching chairs:", error);
    return []; // Return empty array to prevent breaking the frontend
  }
}
