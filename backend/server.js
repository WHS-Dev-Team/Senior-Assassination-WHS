const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./mongoconnect'); // Import the connectToMongoDB function
const apiRoutes = require('./routes/api'); // Import the apiRoutes
const handlerRoutes = require('./handler/handler'); // Import the handlerRoutes

const app = express();

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')))
// Middleware to parse JSON bodies
app.use(bodyParser.json())
// Mount the apiRoutes under the '/api' prefix
app.use('/api', apiRoutes);
// Mount the handlerRoutes under the '/handlers' prefix
app.use('/handlers', handlerRoutes);

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    const port = process.env.PORT || 6969;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Error starting the server:", error);
  });
