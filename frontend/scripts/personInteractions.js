const { MongoClient } = require('mongodb');

// Update your MongoDB connection URI here
const uri = "mongodb+srv://bryanchin:3duZATgz9UxJOIiC@whsseniorassassin.y3uvizr.mongodb.net/?retryWrites=true&w=majority";

// Function to get a random alive person from the database
async function getRandomAlivePerson() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('senior');
    const collection = database.collection('person');

    const alivePeople = await collection.find({ status: 'alive' }).toArray();
    const randomIndex = Math.floor(Math.random() * alivePeople.length);
    return alivePeople[randomIndex];
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

// Function to check if there is a stored person, and if they are still alive
async function getStoredPerson() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('senior');
    const collection = database.collection('person');

    const storedPerson = JSON.parse(localStorage.getItem('assassinationTarget'));
    if (storedPerson) {
      const isAlive = await collection.findOne({
        name: storedPerson.name,
        status: 'alive'
      });

      if (isAlive) {
        return storedPerson;
      } else {
        localStorage.removeItem('assassinationTarget');
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}
async function saveSelectedPerson(person) {
  try {
    await fetch('/api/save-person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
  } catch (error) {
    console.error(error);
  }
} 

function fetchData() {
  fetch('/api/people')
    .then(response => response.json())
    .then(data => {
      // Process the data received from the server
      // You can update your UI here with the received data
    })
    .catch(error => console.error(error));
}

// Main function to display the person on the page
async function displayPerson() {
  try {
    fetchData();

    const person = await getStoredPerson() || await getRandomAlivePerson();

    // Update the HTML with the person's image and name
    const image = document.getElementById('person-image');
    const name = document.getElementById('person-name');
    const status = document.getElementById('person-status');
    image.src = person.image;
    name.textContent = person.name;
    status.textContent = person.status;

    // Update the status element background color based on the person's status
    if (person.status === 'alive') {
      status.style.backgroundColor = 'green';
    } else if (person.status === 'dead') {
      status.style.backgroundColor = 'red';
    }
    saveSelectedPerson(person); 
  } catch (error) {
    console.error(error);
  }
}

// Call the main function to display the person on page load
displayPerson();
