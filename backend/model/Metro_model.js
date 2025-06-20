const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timings: {
    type: Object,
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { _id: false });

const MetroLineSchema = new mongoose.Schema({
  lineName: { type: String, required: true },
  direction: { type: String, required: true },
  frequencyMinutes: { type: Number, required: true },
  operatingHours: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  stations: [StationSchema],
  fares: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model("MetroLine", MetroLineSchema);