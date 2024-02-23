const { createServer } = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./mongoconnect.cjs'); // Adjust the path if needed
const apiRoutes = require('./routes/api.cjs');
const cors = require('cors');


const { fileURLToPath } = require('url');
const { dirname } = require('path');
const fs = require('fs');

const app = express();
const server = createServer(app);

app.use(cors()); // Enable CORS for all origins

app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '../frontend')));
const serveScriptsPath = path.join(__dirname, '../frontend/scripts');

app.use(express.static(serveScriptsPath, {
  extensions: ['cjs', 'js'], 
  index: false,
}));

const dataListenerPath = path.join(__dirname, './dataListener.js');
require(dataListenerPath);

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../frontend');;
  res.sendFile(filePath);
});

app.get('/home', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/index.html');;
  res.sendFile(filePath);
});

app.get('/scripts/personInteractions.mjs', (req, res) => {
  res.type('application/javascript'); // Set the correct MIME type
  res.sendFile(path.join(__dirname, '../frontend/scripts/personInteractions.mjs'));
});

app.get('/backend/handler/handler.mjs', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, '../backend/handler/handler.mjs'));
});


// Set the appropriate Content-Type for JavaScript files
app.get('*.{mjs,cjs}', (req, res, next) => {
  res.type('application/javascript');
  next();
});

// Serve the index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/permission_denied.html'));
});

connectToMongoDB()
  .then(() => {
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Link to localhost: http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error("Error starting the server:", error);
  });
