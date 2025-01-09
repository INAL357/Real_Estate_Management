import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv' // Load environment variables
import authRoutes from '../server/router/auth.js'; 
dotenv.config()
const app = express();
import listingRoutes from "./router/listing.js"
import bookingRoutes from "./router/booking.js"
import userRoutes from "./router/user.js"


// Middleware
app.use(express.json());
app.use(express.static("public"));

app.use(cors({
    origin: 'http://localhost:5173', 
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials:true
}));



// Routes
app.use("/api/auth", authRoutes);
app.use("/listing",listingRoutes);
app.use("/booking",bookingRoutes);
app.use("/user",userRoutes)

// MongoDB Connection
const PORT = 4000; // Port for the server
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL); 
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

connectDB();

// Start the Server
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started on http://localhost:${PORT}`);
    } else {
        console.error("Error: " + err);
    }
});
