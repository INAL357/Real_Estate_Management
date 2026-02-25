import express from "express";
import multer from "multer";
import Listing from "../models/Listing.js";
import mongoose from 'mongoose';
const router = express.Router();

// Configuring multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage }); // No file size limit here

// Create listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No files uploaded");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path.replace("public", ""));

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({ message: "Failed to create listing", error: err.message });
    console.error(err);
  }
});

// Get listings by category
router.get("/", async (req, res) => {
  const qCategory = req.query.qCategory;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.error(err);
  }
});

// Search listings by title/category
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  try {
    let listings = [];
    if (search === "All") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.error(err);
  }
});

// Get listing details by ID
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const listing = await Listing.findById(id).populate("creator").exec();
//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }
//     res.status(200).json(listing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch listing", error: err.message });
//   }
// });

//listingDetail
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listing", error: err.message });
  }
});

//delete code 
router.delete("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(listingId);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found!" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting listing:", err.message);
    res.status(500).json({ error: err.message });
  }
});




export default router;
