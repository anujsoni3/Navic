const mongoose = require("mongoose");

const rentalProviderSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["company", "individual"] },
  vehicles: [String],
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  availability: Boolean,
  pricing: {
    hourly: Number,
    daily: Number,
    subscription: {
      weekly: Number,
      monthly: Number,
    },
  },
  contact: {
    phone: String,
    email: String,
  },
  ratings: {
    average: Number,
    total_reviews: Number,
  },
  booking_url: String,
});

module.exports = mongoose.model("RentalProvider", rentalProviderSchema);
