const BusLine = require("../model/Bus_model");

exports.uploadBusData = async (req, res) => {
  try {
    // Validate incoming data
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).json({ 
        message: "Invalid data format. Expected an array of bus line objects." 
      });
    }

    // Optional: Clear existing entries if needed
    // await BusLine.deleteMany({}); // uncomment if you want to reset data every time

    // Insert the bus line data
    const insertedData = await BusLine.insertMany(req.body);
    
    res.status(200).json({ 
      message: "Bus data uploaded successfully",
      count: insertedData.length,
      data: insertedData
    });
  } catch (error) {
    console.error("Error uploading bus data:", error);
    res.status(500).json({ 
      message: "Failed to upload bus data", 
      error: error.message 
    });
  }
};

// Additional helper function to get all bus lines
exports.getAllBusLines = async (req, res) => {
  try {
    const busLines = await BusLine.find({});
    res.status(200).json({
      message: "Bus lines retrieved successfully",
      count: busLines.length,
      data: busLines
    });
  } catch (error) {
    console.error("Error retrieving bus lines:", error);
    res.status(500).json({
      message: "Failed to retrieve bus lines",
      error: error.message
    });
  }
};

// Function to get a specific bus line by name
exports.getBusLineByName = async (req, res) => {
  try {
    const { lineName } = req.params;
    const busLine = await BusLine.findOne({ lineName });
    
    if (!busLine) {
      return res.status(404).json({
        message: `Bus line '${lineName}' not found`
      });
    }

    res.status(200).json({
      message: "Bus line retrieved successfully",
      data: busLine
    });
  } catch (error) {
    console.error("Error retrieving bus line:", error);
    res.status(500).json({
      message: "Failed to retrieve bus line",
      error: error.message
    });
  }
};

// Function to get fare between two stations
exports.getFareBetweenStations = async (req, res) => {
  try {
    const { lineName, fromStation, toStation } = req.params;
    
    const busLine = await BusLine.findOne({ lineName });
    
    if (!busLine) {
      return res.status(404).json({
        message: `Bus line '${lineName}' not found`
      });
    }

    const fare = busLine.fares[fromStation]?.[toStation];
    
    if (fare === undefined) {
      return res.status(404).json({
        message: `Fare not found between '${fromStation}' and '${toStation}'`
      });
    }

    res.status(200).json({
      message: "Fare retrieved successfully",
      fromStation,
      toStation,
      fare,
      lineName
    });
  } catch (error) {
    console.error("Error retrieving fare:", error);
    res.status(500).json({
      message: "Failed to retrieve fare",
      error: error.message
    });
  }
};

// Function to get station information
exports.getStationInfo = async (req, res) => {
  try {
    const { lineName, stationName } = req.params;
    
    const busLine = await BusLine.findOne({ lineName });
    
    if (!busLine) {
      return res.status(404).json({
        message: `Bus line '${lineName}' not found`
      });
    }

    const station = busLine.stations.find(s => s.name === stationName);
    
    if (!station) {
      return res.status(404).json({
        message: `Station '${stationName}' not found on ${lineName}`
      });
    }

    res.status(200).json({
      message: "Station information retrieved successfully",
      data: station,
      lineName
    });
  } catch (error) {
    console.error("Error retrieving station info:", error);
    res.status(500).json({
      message: "Failed to retrieve station information",
      error: error.message
    });
  }
};
