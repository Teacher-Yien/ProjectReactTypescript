const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const resData = require('./model'); // Ensure this exports a valid Mongoose model

dotenv.config(); // Load environment variables

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI)
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to mongoDB:", error);
    });

app.get('/ProductDetails', async (req, res) => {
  try {
    const products = await resData.find(); // Fetch all products from the database
    res.status(200).json(products); // Send products as JSON
  } catch (e) {
    console.error("Error fetching from MongoDB", e);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
