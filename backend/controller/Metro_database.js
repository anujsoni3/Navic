const MetroLine = require("../model/Metro_model");

exports.uploadMetroData = async (req, res) => {
  try {
    // Validate incoming data
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).json({ 
        message: "Invalid data format. Expected an array of metro line objects." 
      });
    }

    // Optional: Clear existing entries if needed
    // await MetroLine.deleteMany({}); // uncomment if you want to reset data every time

    // Insert the metro line data
    const insertedData = await MetroLine.insertMany(req.body);
    
    res.status(200).json({ 
      message: "Metro data uploaded successfully",
      count: insertedData.length,
      data: insertedData
    });
  } catch (error) {
    console.error("Error uploading metro data:", error);
    res.status(500).json({ 
      message: "Failed to upload metro data", 
      error: error.message 
    });
  }
};

// Additional helper function to get all metro lines
exports.getAllMetroLines = async (req, res) => {
  try {
    const metroLines = await MetroLine.find({});
    res.status(200).json({
      message: "Metro lines retrieved successfully",
      count: metroLines.length,
      data: metroLines
    });
  } catch (error) {
    console.error("Error retrieving metro lines:", error);
    res.status(500).json({
      message: "Failed to retrieve metro lines",
      error: error.message
    });
  }
};

// Function to get a specific metro line by name
exports.getMetroLineByName = async (req, res) => {
  try {
    const { lineName } = req.params;
    const metroLine = await MetroLine.findOne({ lineName });
    
    if (!metroLine) {
      return res.status(404).json({
        message: `Metro line '${lineName}' not found`
      });
    }

    res.status(200).json({
      message: "Metro line retrieved successfully",
      data: metroLine
    });
  } catch (error) {
    console.error("Error retrieving metro line:", error);
    res.status(500).json({
      message: "Failed to retrieve metro line",
      error: error.message
    });
  }
};

// Function to get fare between two stations
exports.getFareBetweenStations = async (req, res) => {
  try {
    const { lineName, fromStation, toStation } = req.params;
    
    const metroLine = await MetroLine.findOne({ lineName });
    
    if (!metroLine) {
      return res.status(404).json({
        message: `Metro line '${lineName}' not found`
      });
    }

    const fare = metroLine.fares[fromStation]?.[toStation];
    
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
    
    const metroLine = await MetroLine.findOne({ lineName });
    
    if (!metroLine) {
      return res.status(404).json({
        message: `Metro line '${lineName}' not found`
      });
    }

    const station = metroLine.stations.find(s => s.name === stationName);
    
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