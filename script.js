// Function to get a random alive person from the array
function getRandomAlivePerson(people) {
  const alivePeople = people.filter(person => person.status === "alive");
  const randomIndex = Math.floor(Math.random() * alivePeople.length);
  return alivePeople[randomIndex];
}

// Function to check if there is a stored person, and if they are still alive
function getStoredPerson(people) {
  const storedPerson = JSON.parse(localStorage.getItem("assassinationTarget"));
  if (storedPerson) {
    const isAlive = people.some(person => person.name === storedPerson.name && person.status === "alive");
    if (isAlive) {
      return storedPerson;
    } else {
      localStorage.removeItem("assassinationTarget");
    }
  }
}

// Function to save a new person to local storage
function saveNewTarget(person) {
  localStorage.setItem("assassinationTarget", JSON.stringify(person));
}

// Main function to display the person on the page
function displayPerson() {
  // Get the people data from the JSON file
  fetch("people.json")
    .then(response => response.json())
    .then(people => {
      let person;
      // Check if there is a stored person, and if they are still alive
      const storedPerson = getStoredPerson(people);
      if (storedPerson) {
        person = storedPerson;
      } else {
        // Pick a random alive person if there is no stored person or if the stored person is dead
        person = getRandomAlivePerson(people);
        saveNewTarget(person);
      }

      // Update the HTML with the person's image and name
      const image = document.getElementById("person-image");
      const name = document.getElementById("person-name");
      const status = document.getElementById("person-status");
      image.src = person.image;
      name.textContent = person.name;
      status.textContent = person.status;
      
      // Update the status element background color based on the person's status
      if (person.status === "alive") {
        status.style.backgroundColor = "green";
      } else if (person.status === "dead") {
        status.style.backgroundColor = "red";
      }
    })
    .catch(error => console.error(error));
}

// Call the main function to display the person on page load
displayPerson();
  