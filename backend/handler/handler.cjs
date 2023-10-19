// backend/handler/handler.cjs
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId for querying by ID
const database = require('../mongoconnect.cjs'); // Import the database object
const uri = process.env.URI || "mongodb+srv://bryanchin:3duZATgz9UxJOIiC@whsseniorassassin.y3uvizr.mongodb.net/?retryWrites=true&w=majority";

async function getAllPeople() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('senior');
    const collection = database.collection('person');
    const people = await collection.find({}).toArray();
    return people;
  } finally {
    client.close();
  }
}

async function getPersonById(id) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('senior');
    const collection = database.collection('person');
    const person = await collection.findOne({ _id: ObjectId(id) });
    return person;
  } finally {
    client.close();
  }
}

async function getRandomAlivePerson() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('senior');
    const collection = database.collection('person');

    const alivePeople = await collection.find({ status: 'alive', taken: false }).toArray();
    if (alivePeople.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * alivePeople.length);
    return alivePeople[randomIndex];
  } finally {
    client.close();
  }
}

async function checkIfAlive(name) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('senior');
    const collection = database.collection('person');
    const person = await collection.findOne({ name, status: 'alive' });
    return person ? { alive: true } : { alive: false };
  } finally {
    client.close();
  }
}

module.exports = { getAllPeople, getPersonById, getRandomAlivePerson, checkIfAlive };
