// frontend\scripts\personInteractions.js
const { getRandomAlivePerson, checkIfAlive } = require('../../backend/handler/handler.cjs');

async function fetchData() {
  try {
    const response = await fetch('/api/people');
    const data = await response.json();
    const peopleList = document.getElementById('people-list');

    data.forEach(person => {
      const listItem = document.createElement('li');
      listItem.textContent = person.name;
      peopleList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
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
