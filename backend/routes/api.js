const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId for querying by ID
const database = require('../mongoconnect'); // Import the database object

// Get all people
router.get('/people', async (req, res) => {
    try {
        const people = await database.collection('person').find({}).toArray();
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific person by name
router.get('/people/:name', async (req, res) => {
    try {
        const person = await database.collection('person').findOne({ name: req.params.name });
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
