// backend\server.cjs
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./mongoconnect.cjs');
const apiRoutes = require('./routes/api.cjs');


const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.static(path.join(__dirname, '../frontend/scripts'), {
  extensions: ['mjs'],
  index: false,
}));

app.get('/scripts/personInteractions.mjs', (req, res) => {
  res.type('application/javascript'); // Set the correct MIME type
  res.sendFile(path.join(__dirname, '../frontend/scripts/personInteractions.mjs'));
});

app.get('/handler', (req, res) => {
  const filePath = path.join(__dirname, '../backend/handler/handler.cjs');
  res.type('application/javascript');
  res.removeHeader('Content-Disposition');
  res.sendFile(filePath);
});

// Serve the index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/permission_denied.html'));
});

// Set the appropriate Content-Type for JavaScript files
app.get('*.{mjs,cjs}', (req, res, next) => {
  res.type('application/javascript');
  next();
});

app.get('/bundle.js', (req, res) => {
  const filePath = path.join(__dirname, '../dist/bundle.js');
  res.type('application/javascript'); // Set the correct MIME type
  res.sendFile(filePath);
});

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    const port = process.env.PORT || 6969;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Link to localhost: http://localhost:${port}`)
    });
  })
  .catch(error => {
    console.error("Error starting the server:", error);
  });
