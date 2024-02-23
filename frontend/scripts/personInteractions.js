// frontend/scripts/personInteractions.js

import { get } from 'axios';


const dataDirectory = '../data'; 

async function fetchData(fileName) {
  try {
    const response = await get(`${dataDirectory}/${fileName}`);
    const data = await response.json();
    const peopleList = document.getElementById('people-list');

    data.forEach(person => {
      const listItem = document.createElement('li');
      listItem.textContent = person.name;
      peopleList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getRandomAlivePerson() {
  try {
    const response = await get(fileNames);
    const alivePeople = response.data.filter(person => person.status === 'alive' && person.taken === false);

    if (alivePeople.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * alivePeople.length);
    return alivePeople[randomIndex];
  } catch (error) {
    console.error('Error fetching alive people:', error);
    return null;
  }
}

async function getStoredPerson() {
  const storedPerson = JSON.parse(localStorage.getItem('assassinationTarget'));

  if (storedPerson) {
    try {
      const isAlive = await checkIfAlive(storedPerson.name);

      if (isAlive) {
        return storedPerson;
      } else {
        localStorage.removeItem('assassinationTarget');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

function saveNewTarget(person) {
  localStorage.setItem('assassinationTarget', JSON.stringify(person));
}

async function displayPerson() {
  try {
    await fetchData();

    const person = await getStoredPerson() || await getRandomAlivePerson();

    const image = document.getElementById('person-image');
    const name = document.getElementById('person-name');
    const status = document.getElementById('person-status');

    image.src = person.image;
    name.textContent = person.name;
    status.textContent = person.status;

    status.style.backgroundColor = person.status === 'alive' ? 'green' : 'red';

    saveNewTarget(person);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function main() {
  console.log('main() run');
  await displayPerson();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  main();
});
