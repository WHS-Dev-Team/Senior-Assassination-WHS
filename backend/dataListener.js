// backend/dataListener.js
const axios = require('axios');
const fs = require('fs');
const express = require('express');
const { format } = require('date-fns');
const path = require('path');
const cors = require('cors');

const apiEndpoint = 'http://localhost:8080/api/people'; // Replace with your actual API endpoint

// Get the current date and format it as 'YYYY-MM-DD'
const currentDate = format(new Date(), 'yyyy-MM-dd');
const localFilePath = path.join(__dirname, '../frontend/data', `localData_${currentDate}.json`);

async function fetchDataAndSaveLocally(apiEndpoint, localFilePath) {
  try {
    // Add a delay to wait for the server to fully start (adjust the time as needed)
    await new Promise(resolve => setTimeout(resolve, 5000));

    const response = await axios.get(apiEndpoint);
    const jsonData = response.data;

    // Check if the file exists and replce it if it does
    // if (fs.existsSync(localFilePath)) {
    //   fs.unlinkSync(localFilePath);
    // }

    // Save JSON data locally with indentation
    fs.writeFileSync(localFilePath, JSON.stringify(jsonData, null, 2));

    console.log(`JSON data saved locally at ${localFilePath}`);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
}

const app = express();
app.use(cors()); // Enable CORS for all origins
// app.listen(3000); // Change the port if needed

// Fetch data and save it locally
fetchDataAndSaveLocally(apiEndpoint, localFilePath);
