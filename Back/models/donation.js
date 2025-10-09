import mongoose from "mongoose";

// Define schema for a donation record
const donationSchema = new mongoose.Schema(
  {
    // Basic donor info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Donation details
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    goodsAmount: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },

    // Organization info (sent from frontend)
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
    },
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },

    // Additional fields for tracking
    currentNeeds: {
      type: String,
      default: "",
      trim: true,
    },
    receivedItems: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

// Create model
const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
