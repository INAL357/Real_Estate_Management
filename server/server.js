import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./router/auth.js";
import listingRoutes from "./router/listing.js";
import bookingRoutes from "./router/booking.js";
import userRoutes from "./router/user.js";

const app = express();

// --------------------
// Middleware
// --------------------

app.use(express.json());
app.use(express.static("public"));

const allowedOrigins = [
  "http://localhost:5173",
  "https://YOUR-FRONTEND.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// --------------------
// Routes
// --------------------

app.use("/api/auth", authRoutes);
app.use("/listing", listingRoutes);
app.use("/booking", bookingRoutes);
app.use("/user", userRoutes);

// --------------------
// Health check
// --------------------

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// --------------------
// MongoDB
// --------------------

const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// --------------------
// Server
// --------------------

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});