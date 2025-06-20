const express = require("express");
const router = express.Router();
const { handleRentalForm } = require("../controller/rentalController");

router.post("/submit", handleRentalForm);
module.exports = router;
