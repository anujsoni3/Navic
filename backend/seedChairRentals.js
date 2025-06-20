const mongoose = require("mongoose");
const ChairRental = require("./models/ChairRental"); // Assuming your model file is in models folder
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleChairRentals = [
  {
    name: "Foldable Lightweight Wheelchair",
    type: "manual",
    pricePerHour: 30,
    pricePerDay: 150,
    availability: true,
    location: {
      address: "123 Health Street, Nagpur",
      lat: 21.1458,
      lng: 79.0882
    },
    features: ["foldable", "lightweight (10kg)", "adjustable arms"],
    imageUrl: "https://example.com/wheelchair1.jpg"
  },
  {
    name: "Electric Wheelchair Pro",
    type: "electric",
    pricePerHour: 80,
    pricePerDay: 400,
    availability: true,
    location: {
      address: "456 Care Avenue, Nagpur",
      lat: 21.1538,
      lng: 79.0835
    },
    features: ["20km battery range", "joystick control", "reclining back"],
    imageUrl: "https://example.com/wheelchair2.jpg"
  },
  {
    name: "Heavy-Duty Wheelchair",
    type: "manual",
    pricePerHour: 50,
    pricePerDay: 250,
    availability: false, // Currently rented out
    location: {
      address: "789 Medical Road, Nagpur",
      lat: 21.1350,
      lng: 79.0905
    },
    features: ["200kg capacity", "extra-wide seat", "anti-tip bars"],
    imageUrl: "https://example.com/wheelchair3.jpg"
  },
  {
    name: "Sports Wheelchair",
    type: "manual",
    pricePerHour: 60,
    pricePerDay: 300,
    availability: true,
    location: {
      address: "321 Fitness Plaza, Nagpur",
      lat: 21.1420,
      lng: 79.0950
    },
    features: ["lightweight frame", "anti-tip wheels", "quick-release axles"],
    imageUrl: "https://example.com/wheelchair4.jpg"
  },
  {
    name: "Pediatric Wheelchair",
    type: "manual",
    pricePerHour: 40,
    pricePerDay: 200,
    availability: true,
    location: {
      address: "654 Child Care Center, Nagpur",
      lat: 21.1480,
      lng: 79.0850
    },
    features: ["smaller frame", "safety belts", "colorful design"],
    imageUrl: "https://example.com/wheelchair5.jpg"
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await ChairRental.deleteMany({});
    console.log("Cleared existing wheelchair data");
    
    // Insert new sample data
    await ChairRental.insertMany(sampleChairRentals);
    console.log(`${sampleChairRentals.length} wheelchair rentals inserted successfully`);
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

// Execute the seeding function
seedDatabase();