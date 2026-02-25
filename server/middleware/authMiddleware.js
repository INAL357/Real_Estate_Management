import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import your user model

// Middleware to authenticate users
export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access. Token required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user details to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

// Middleware to authorize admin users
export const authorizeAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id); // Fetch user from the database

        if (!user || user.role !== 'admin') { // Check if user is an admin
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // Proceed if the user is an admin
    } catch (error) {
        res.status(500).json({ message: 'Authorization failed.', error: error.message });
    }
};
