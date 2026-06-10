const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Allow all requests and parse JSON
app.use(cors());
app.use(express.json());

// Serve your frontend HTML files
app.use(express.static(path.join(__dirname, 'frontend')));

// API routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/leads', require('./backend/routes/leads'));

// Connect to MongoDB, then start the server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        app.listen(process.env.PORT || 5000, () => {
            console.log('✅ Server running at http://localhost:5000');
        });
    })
    .catch(err => {
        console.error('❌ MongoDB error:', err.message);
    });