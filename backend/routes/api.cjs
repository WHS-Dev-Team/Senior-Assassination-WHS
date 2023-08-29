// backend/routes/api.js

const express = require('express');
const router = express.Router();
const { connectToMongoDB } = require('../mongoconnect.cjs'); // Import the connectToMongoDB function
const { getRandomAlivePerson, checkIfAlive } = require('../handler/handler'); // Import the handler functions

// Get all people
router.get('/people', async (req, res) => {
    try {
        const database = await connectToMongoDB();
        const peopleCollection = database.collection('person');
        const people = await peopleCollection.find({}).toArray();
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific person by name
router.get('/person/:name', async (req, res) => {
    try {
        const database = await connectToMongoDB();
        const peopleCollection = database.collection('person');
        const person = await peopleCollection.findOne({ name: req.params.name });
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/random-alive-person', async (req, res) => {
    try {
        const person = await getRandomAlivePerson();
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check if a stored person is still alive
router.get('/check-if-alive/:name', async (req, res) => {
    try {
        const person = await checkIfAlive(req.params.name);
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
