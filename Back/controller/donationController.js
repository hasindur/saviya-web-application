import Donation from "../models/donation.js";

// 💾 Create a new donation
export const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    const savedDonation = await donation.save();
    res.status(201).json({ success: true, data: savedDonation });
  } catch (error) {
    console.error("Donation Error:", error);
    res.status(500).json({ success: false, message: "Failed to create donation" });
  }
};

// 📜 Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    console.error("Fetch Donations Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch donations" });
  }
};
