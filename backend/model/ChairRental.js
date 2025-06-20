const mongoose = require("mongoose");

const chairRentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Wheelchair name is required"],
    trim: true
  },
  type: {
    type: String,
    enum: ["manual", "electric"],
    required: [true, "Type (manual/electric) is required"]
  },
  pricePerHour: {
    type: Number,
    required: [true, "Hourly rate is required"],
    min: [0, "Price cannot be negative"]
  },
  pricePerDay: {
    type: Number,
    required: [true, "Daily rate is required"],
    min: [0, "Price cannot be negative"]
  },
  availability: {
    type: Boolean,
    default: true
  },
  location: {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true
    },
    lat: {
      type: Number,
      required: [true, "Latitude is required"],
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
      required: [true, "Longitude is required"],
      min: -180,
      max: 180
    }
  },
  features: {
    type: [String],
    default: [],
    validate: {
      validator: (features) => features.length <= 10,
      message: "Maximum 10 features allowed"
    }
  },
  imageUrl: {
    type: String,
    match: [/^https?:\/\/.+\..+$/, "Invalid image URL format"]
  }
}, { 
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true }, // Include virtuals when converted to JSON
  toObject: { virtuals: true }
});

// Index for geospatial queries
chairRentalSchema.index({ "location.lat": 1, "location.lng": 1 });

// Virtual for formatted location
chairRentalSchema.virtual("location.formatted").get(function() {
  return `${this.location.address} (${this.location.lat}, ${this.location.lng})`;
});

module.exports = mongoose.model("ChairRental", chairRentalSchema);