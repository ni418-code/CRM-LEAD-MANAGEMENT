const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check username and password against .env values
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        // Create a token that lasts 8 hours
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Wrong username or password.' });
    }
});

module.exports = router;