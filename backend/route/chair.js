const express = require("express");
const router = express.Router();
const RentalProvider = require("../model/ChairRental");

// Get all rentals
router.get("/chair", async (req, res) => {
  try {
    const rentals = await RentalProvider.find();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
