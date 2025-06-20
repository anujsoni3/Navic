const mongoose = require("mongoose");
const RentalProvider = require("./models/RentalProvider");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const sampleRentals =[
  {
    "name": "MB Car Rental",
    "type": "company",
    "vehicles": ["Swift Dzire", "Toyota Fortuner", "Innova Crysta"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Narendra Nagar, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 150,
      "daily": 1200,
      "weekly": 7000
    },
    "contact": {
      "phone": "+91 9225210869",
      "email": "book@mbcarrental.com"
    },
    "ratings": {
      "average": 4.3,
      "total_reviews": 120
    },
    "booking_url": "https://www.mbcarrentalnagpur.com/"
  },
  {
    "name": "FlipCar",
    "type": "company",
    "vehicles": ["Suzuki Dzire", "Grand i10", "Toyota Innova"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Ramdaspeth, Nagpur"
    },
    "availability": true,
    "pricing": {
      "per_day": {
        "Suzuki Dzire": 500,
        "Grand i10": 600,
        "Toyota Innova": 800
      }
    },
    "contact": {
      "phone": "+91 9764036786",
      "email": "book@flipcar.in"
    },
    "ratings": {
      "average": 4.5,
      "total_reviews": 200
    },
    "booking_url": "https://www.flipcar.in/nagpur"
  },
  {
    "name": "AMZ Cabs",
    "type": "company",
    "vehicles": ["Swift Dzire", "Maruti Ertiga", "Kia Carens", "Maruti Ciaz", "Innova Crysta"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Sitabuldi, Nagpur"
    },
    "availability": true,
    "pricing": {
      "8_hr_80_km": {
        "Swift Dzire": 2000,
        "Maruti Ertiga": 2400,
        "Kia Carens": 2800,
        "Maruti Ciaz": 3600,
        "Innova Crysta": 3300
      },
      "extra_km": 12
    },
    "contact": {
      "phone": "+91 8698454528",
      "email": "book@amzcabs.in"
    },
    "ratings": {
      "average": 4.7,
      "total_reviews": 180
    },
    "booking_url": "https://amzcabs.in/nagpur"
  },
  {
    "name": "SS Car Rental",
    "type": "company",
    "vehicles": ["Hyundai Verna", "Toyota Fortuner", "Mercedes C-Class"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Dharampeth, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 200,
      "daily": 1800,
      "weekly": 10000
    },
    "contact": {
      "phone": "+91 9876543210",
      "email": "book@sscarrental.com"
    },
    "ratings": {
      "average": 4.4,
      "total_reviews": 150
    },
    "booking_url": "https://www.sscarrentalnagpur.com/"
  },
  {
    "name": "Sudarshan Cars",
    "type": "company",
    "vehicles": ["Honda City", "Mahindra Scorpio", "BMW 3 Series"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Civil Lines, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 220,
      "daily": 2000,
      "weekly": 12000
    },
    "contact": {
      "phone": "+91 8765432109",
      "email": "book@sudarshancars.com"
    },
    "ratings": {
      "average": 4.7,
      "total_reviews": 210
    },
    "booking_url": "https://www.sudarshancars.com/nagpur"
  },
  {
    "name": "Manisha Tours and Travels",
    "type": "company",
    "vehicles": ["Innova Crysta", "Maruti Ertiga", "Kia Carens", "Toyota Glanza", "Swift", "Traveller"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Abhyankar Nagar, Nagpur"
    },
    "availability": true,
    "pricing": {
      "per_km": {
        "Innova Crysta": 18,
        "Maruti Ertiga": 15,
        "Kia Carens": 16,
        "Toyota Glanza": 12,
        "Swift": 12,
        "Traveller": 30
      }
    },
    "contact": {
      "phone": "+91 9890644561",
      "email": "book@manishatours.com"
    },
    "ratings": {
      "average": 4.8,
      "total_reviews": 150
    },
    "booking_url": "https://manishatours.com/nagpur"
  },
  {
    "name": "Tanushree Cabs",
    "type": "company",
    "vehicles": ["Innova Crysta", "Swift Dzire", "Maruti Ertiga", "Kia Carens", "Maruti Ciaz"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Wardha Road, Nagpur"
    },
    "availability": true,
    "pricing": {
      "8_hr_80_km": {
        "Innova Crysta": 3300,
        "Swift Dzire": 2000,
        "Maruti Ertiga": 2400,
        "Kia Carens": 2800,
        "Maruti Ciaz": 3600
      },
      "extra_km": 15
    },
    "contact": {
      "phone": "+91 8698454528",
      "email": "book@tanushreecabs.com"
    },
    "ratings": {
      "average": 4.6,
      "total_reviews": 160
    },
    "booking_url": "https://tanushreecabs.com/nagpur"
  },
  {
    "name": "Kumar Travels",
    "type": "company",
    "vehicles": ["Swift Dzire", "Toyota Fortuner", "Innova Crysta"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Narendra Nagar, Nagpur"
    },
    "availability": true,
    "pricing": {
      "per_km": {
        "Swift Dzire": 12,
        "Toyota Fortuner": 25,
        "Innova Crysta": 18
      }
    },
    "contact": {
      "phone": "+91 9225210869",
      "email": "book@kumartravels.com"
    },
    "ratings": {
      "average": 4.4,
      "total_reviews": 140
    },
    "booking_url": "https://www.kumartravelsnagpur.com/"
  },
  {
    "name": "Zoomcar Nagpur",
    "type": "company",
    "vehicles": ["Hyundai i20", "Tata Nexon", "Mahindra XUV700"],
    "location": {
      "latitude": 21.1458,
      "longitude": 79.0882,
      "address": "Civil Lines, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 120,
      "daily": 750,
      "weekly": 4500
    },
    "contact": {
      "phone": "+91 8010080000",
      "email": "nagpur@zoomcar.com"
    },
    "ratings": {
      "average": 4.4,
      "total_reviews": 240
    },
    "booking_url": "https://www.zoomcar.com/nagpur"
  },
  {
    "name": "Revv Car Rentals",
    "type": "company",
    "vehicles": ["Maruti Swift", "Hyundai Creta", "Toyota Innova"],
    "location": {
      "latitude": 21.1342,
      "longitude": 79.0976,
      "address": "Ramdaspeth, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 150,
      "daily": 900,
      "weekly": 5000
    },
    "contact": {
      "phone": "+91 9250030000",
      "email": "nagpur@revv.co.in"
    },
    "ratings": {
      "average": 4.5,
      "total_reviews": 310
    },
    "booking_url": "https://www.revv.co.in/nagpur"
  },
  {
    "name": "Royal Cabs Nagpur",
    "type": "company",
    "vehicles": ["Toyota Camry", "Mercedes E-Class", "Audi A4"],
    "location": {
      "latitude": 21.1601,
      "longitude": 79.0755,
      "address": "Dharampeth, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 250,
      "daily": 1500,
      "weekly": 9000
    },
    "contact": {
      "phone": "+91 9822040404",
      "email": "book@royalcabs.com"
    },
    "ratings": {
      "average": 4.7,
      "total_reviews": 180
    },
    "booking_url": "https://royalcabsnagpur.com"
  },
  {
    "name": "Nagpur Bike Rental",
    "type": "company",
    "vehicles": ["Royal Enfield Classic 350", "Honda Activa", "TVS Jupiter"],
    "location": {
      "latitude": 21.1521,
      "longitude": 79.0833,
      "address": "Sadar, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 100,
      "daily": 600,
      "weekly": 3500
    },
    "contact": {
      "phone": "+91 9372650999",
      "email": "book@nagpurbikerental.com"
    },
    "ratings": {
      "average": 4.6,
      "total_reviews": 220
    },
    "booking_url": "https://www.nagpurbikerental.com"
  },
  {
    "name": "Drivezy Nagpur",
    "type": "company",
    "vehicles": ["Maruti Baleno", "Hyundai i10", "KTM Duke 390"],
    "location": {
      "latitude": 21.1405,
      "longitude": 79.0989,
      "address": "Sitabuldi, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 130,
      "daily": 850,
      "weekly": 5200
    },
    "contact": {
      "phone": "+91 8884501111",
      "email": "nagpur@drivezy.com"
    },
    "ratings": {
      "average": 4.3,
      "total_reviews": 275
    },
    "booking_url": "https://www.drivezy.com/nagpur"
  },
  {
    "name": "Nagpur Tempo Traveller",
    "type": "company",
    "vehicles": ["12-Seater Tempo", "16-Seater Tempo"],
    "location": {
      "latitude": 21.1350,
      "longitude": 79.0905,
      "address": "Dharampeth, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 400,
      "daily": 2500,
      "weekly": 15000
    },
    "contact": {
      "phone": "+91 9922344556",
      "email": "book@nagpurtempo.com"
    },
    "ratings": {
      "average": 4.2,
      "total_reviews": 135
    },
    "booking_url": "https://www.nagpurtempotraveller.com"
  },
  {
    "name": "Speedy Rentals Nagpur",
    "type": "company",
    "vehicles": ["Honda Activa", "TVS Apache", "Bajaj Pulsar"],
    "location": {
      "latitude": 21.1532,
      "longitude": 79.0809,
      "address": "Dighori, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 70,
      "daily": 450,
      "weekly": 2800
    },
    "contact": {
      "phone": "+91 9765432108",
      "email": "book@speedyrentals.com"
    },
    "ratings": {
      "average": 4.5,
      "total_reviews": 190
    },
    "booking_url": "https://www.speedyrentalsnagpur.com"
  },
  {
    "name": "Orange City Car Rentals",
    "type": "company",
    "vehicles": ["Hyundai Venue", "Kia Seltos", "Toyota Innova"],
    "location": {
      "latitude": 21.1299,
      "longitude": 79.0883,
      "address": "Gandhibagh, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 160,
      "daily": 950,
      "weekly": 5300
    },
    "contact": {
      "phone": "+91 9145678903",
      "email": "book@orangecityrentals.com"
    },
    "ratings": {
      "average": 4.4,
      "total_reviews": 225
    },
    "booking_url": "https://www.orangecityrentals.com"
  },
  {
    "name": "Nagpur EV Rentals",
    "type": "company",
    "vehicles": ["Tata Nexon EV", "MG ZS EV", "Ola S1 Pro"],
    "location": {
      "latitude": 21.1452,
      "longitude": 79.0856,
      "address": "Dharampeth Extension, Nagpur"
    },
    "availability": true,
    "pricing": {
      "hourly": 120,
      "daily": 700,
      "weekly": 4000
    },
    "contact": {
      "phone": "+91 9898987654",
      "email": "book@nagpurev.com"
    },
    "ratings": {
      "average": 4.7,
      "total_reviews": 210
    },
    "booking_url": "https://www.nagpurevrentals.com"
  }
];

const seedDatabase = async () => {
  await RentalProvider.deleteMany({});

  await RentalProvider.insertMany(sampleRentals)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error inserting data:", err));
};
seedDatabase();