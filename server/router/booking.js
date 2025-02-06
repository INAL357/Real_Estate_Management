import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb"; 
//import Listing from "../models/Listing.js";

const router = express.Router();

// Create Booking
router.post("/create", async (req, res) => {
  try {
<<<<<<< HEAD
    const { 
      customerId, 
      hostId, 
      listingId, 
      visitDate, 
      visitTime, 
      totalPrice 
    } = req.body;
=======
    const { customerId, hostId, listingId, visitDate, visitTime, totalPrice } = req.body;
>>>>>>> 93352ae (commit)

    if (!hostId) {
      return res.status(400).json({ message: "Host ID is missing. Cannot proceed with booking." });
    }

    // Check if the listing has already been booked
    const existingBooking = await Booking.findOne({ listingId });

    if (existingBooking) {
      return res.status(400).json({ message: "This property is already booked." });
    }

    // Create new booking
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      visitDate,
      visitTime, 
      totalPrice,
    });

    // Save booking to database
    await newBooking.save();
    res.status(200).json(newBooking);

  } catch (err) {
    console.error("Error creating booking:", err.message);
    res.status(500).json({ 
      message: "Failed to create a new Booking", 
      error: err.message 
    });
  }
});

router.delete("/user/:userId/reservation/:bookingId/cancel", async (req, res) => {
  try {
    const { userId, bookingId } = req.params;

    // Convert userId to ObjectId
    const userIdObj = new ObjectId(userId);

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify if the booking belongs to the user
    if (
      !booking.customerId.equals(userIdObj) && // Compare ObjectId instances
      !booking.hostId.equals(userIdObj)        // Compare ObjectId instances
    ) {
      return res.status(403).json({ message: "User not authorized to cancel this booking" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    // Remove booking from user's trip and reservation lists
    const user = await User.findById(userIdObj);
    if (user) {
      user.tripList = user.tripList.filter(trip => !trip._id.equals(bookingId)); // Compare ObjectId instances
      user.reservationList = user.reservationList.filter(reservation => !reservation._id.equals(bookingId)); // Compare ObjectId instances
      await user.save();
    }

    return res.status(200).json({
      message: "Booking canceled and deleted successfully",
    });
  } catch (err) {
    console.error("Error canceling trip:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


export default router;


