import express from "express";
import Booking from "../models/Booking.js";
//import Listing from "../models/Listing.js";

const router = express.Router();

// Create Booking
router.post("/create", async (req, res) => {
  try {
    const { 
      customerId, 
      hostId, 
      listingId, 
      startDate, 
      endDate, 
      totalPrice 
    } = req.body;

    if (!hostId) {
      return res.status(400).json({ message: "Host ID is missing. Cannot proceed with booking." });
    }

    // Create new booking
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate, 
      totalPrice,
    });

    // Save booking to database
    await newBooking.save();
    res.status(200).json(newBooking);

  } catch (err) {
    console.error("Error creating booking:", err.message);
    res.status(400).json({ 
      message: "Failed to create a new Booking", 
      error: err.message 
    });
  }
});


export default router;