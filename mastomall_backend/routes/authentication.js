// Import necessary modules and User model
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // Token not found, continue with the login process
        next();
    } else {
        // Token found, verify the token and authenticate the user
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // Token verification failed
                return res.status(403).json({ message: 'Token verification failed' });
            }
            req.user = user;
            next();
        });
    }
}

router.post('/login', authenticateToken, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// /profile API endpoint
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // If the user is authenticated, req.user will be set by the authenticateToken middleware
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve user details based on the user ID from the JWT token
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Return the user's email in the response
        res.json({ email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
