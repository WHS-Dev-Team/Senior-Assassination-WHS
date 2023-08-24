const mongoose = require('mongoose');

// Define the schema for the "person" collection
const personSchema = new mongoose.Schema({
    name: String,
    image: Buffer, // Store images as binary data
    status: String,
    taken: Boolean
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

// Export the model to be used in other parts of your application
module.exports = Person;
