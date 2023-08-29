import { getRandomAlivePerson, checkIfAlive } from '../../backend/handler/handler';

async function displayPerson() {
  try {
    const person = await getStoredPerson() || await getRandomAlivePerson();

    const image = document.getElementById('person-image');
    const name = document.getElementById('person-name');
    const status = document.getElementById('person-status');
    image.src = person.image;
    name.textContent = person.name;
    status.textContent = person.status;

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


async function checkIfAlive(name) {
  try {
    const response = await fetch(`/api/check-if-alive/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to check if ${name} is alive`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getStoredPerson() {
  const storedPerson = JSON.parse(localStorage.getItem('assassinationTarget'));
  if (storedPerson) {
    const isAlive = await checkIfAlive(storedPerson.name);
    if (isAlive) {
      return storedPerson;
    } else {
      localStorage.removeItem('assassinationTarget');
    }
  }
}

async function saveSelectedPerson(person) {
  try {
    const response = await fetch('/api/save-person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    if (!response.ok) {
      throw new Error('Failed to save selected person');
    }
  } catch (error) {
    console.error(error);
  }
}

function fetchData() {
  fetch('/api/people')
    .then(response => response.json())
    .then(data => {
      const peopleList = document.getElementById('people-list');
      data.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person.name;
        peopleList.appendChild(listItem);
      });
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

displayPerson();
