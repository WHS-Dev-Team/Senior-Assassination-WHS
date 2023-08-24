const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();
const port = 3000; // Change this to the desired port

// MongoDB connection URI
const uri = "mongodb+srv://bryanchin:3duZATgz9UxJOIiC@whsseniorassassin.y3uvizr.mongodb.net/?retryWrites=true&w=majority";

// Function to start the MongoDB connection
async function startMongoDBConnection() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Start MongoDB connection
startMongoDBConnection();

// Start the Express server
app.get('/', (req, res) => {
    const htmlContent = fs.readFileSync(path.join(__dirname, 'frontend/index.html'), 'utf-8');
    res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
