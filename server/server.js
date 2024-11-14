const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to the Notecraftr! Use '/api' to access the available endpoints.");
});

// Routes
app.use('/api', noteRoutes);

// Export the app for Vercel
module.exports = app;