const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./mongoconnect');
const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    // All other routes will be handled by the frontend app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
    });

    // Start the server
    const port = process.env.PORT || 6969;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Error starting the server:", error);
  });
