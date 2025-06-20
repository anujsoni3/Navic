const mongoose = require("mongoose");
const MetroLine = require("../model/Metro_model");
const metroData = require("../data/metro.json");

const MONGO_URI = "mongodb+srv://arkinutmal:Tilwara8@cluster0.s7jao.mongodb.net/Navic-Project?retryWrites=true&w=majority&appName=Cluster0";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    await MetroLine.deleteMany({}); // Clear old data if any
    await MetroLine.insertMany(metroData);

    console.log("Metro data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting metro data:", error);
    process.exit(1);
  }
}

seed();
