// backend/handler/handler.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId for querying by ID
const database = require('../mongoconnect.cjs'); // Import the database object
const uri = "mongodb+srv://bryanchin:3duZATgz9UxJOIiC@whsseniorassassin.y3uvizr.mongodb.net/?retryWrites=true&w=majority";

// Get all people
async function getAllPeople() {
    try {
      const people = await database.collection('person').find({}).toArray();
      return people;
    } catch (error) {
      throw error;
    }
  }
  
  // Get a specific person by ID
  async function getPersonById(id) {
    try {
      const person = await database.collection('person').findOne({ _id: ObjectId(id) });
      return person;
    } catch (error) {
      throw error;
    }
  }

  async function getRandomAlivePerson() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('senior');
      const collection = database.collection('person');
  
      const alivePeople = await collection.find({ status: 'alive', taken: false }).toArray();
      if (alivePeople.length === 0) {
        return null; // No available alive people
      }
      const randomIndex = Math.floor(Math.random() * alivePeople.length);
      return alivePeople[randomIndex];
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  }
  
  // Function to check if a person is still alive
  async function checkIfAlive(name) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('senior');
      const collection = database.collection('person');
  
      const person = await collection.findOne({ name: name, status: 'alive' });
      return person ? { alive: true } : { alive: false };
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  }


module.exports =  { getAllPeople, getPersonById, getRandomAlivePerson, checkIfAlive };
