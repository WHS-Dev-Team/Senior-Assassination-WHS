// backend/routes/api.js
const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Import your Person model

// Get all people
router.get('/people', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific person by ID
router.get('/people/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
