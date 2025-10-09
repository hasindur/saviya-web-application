import express from "express";
import { createDonation, getAllDonations } from "../controller/donationController.js";

const router = express.Router();

// POST - Create a new donation
router.post("/", createDonation);

// GET - Retrieve all donations
router.get("/", getAllDonations);

export default router;
