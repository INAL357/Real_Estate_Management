import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";

const router = express.Router();

// Get Trip List
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err.message);
    res.status(404).json({ message: "Cannot find trips!", error: err.message });
  }
});

// Add/Remove Listing to/from WishList
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    if (!user || !listing) {
      return res.status(404).json({ message: "User or Listing not found!" });
    }

    // Check if the listing is already in the wishlist
    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      // Remove listing from wishlist
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing removed from wishList",
        wishList: user.wishList,
      });
    } else {
      // Add listing to wishlist
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing added to wishList",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.error("Error updating wishlist:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get Property List
router.get("/:userId/listing", async (req, res) => {
  try {
    const { userId } = req.params;
    const listing = await Listing.find({ creator: userId }).populate("creator");
    res.status(200).json(listing);
  } catch (err) {
    console.error("Error fetching listings:", err.message);
    res.status(404).json({ message: "Cannot find listing property!", error: err.message });
  }
});

// Get Reservation
router.get("/:userId/reservation", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err.message);
    res.status(404).json({ message: "Cannot find reservations!", error: err.message });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);  // Find user by userId

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return only necessary user details (like isAdmin)
    res.status(200).json({ isAdmin: user.isAdmin, firstname: user.firstname });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});





export default router;

