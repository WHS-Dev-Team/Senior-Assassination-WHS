(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

define(['axios'], function (axios) {

  async function fetchFileList(directoryPath) {
    try {
      const response = await fetch(directoryPath);
      const fileNames = await response.json();
      return fileNames;
    } catch (error) {
      console.error('Error fetching file list:', error);
      throw error;
    }
  }
  
  const dataDirectory = '../data'
  fetchFileList(dataDirectory)
  .then(fileNames => {
    console.log('List of files:', fileNames);
    // Process each file as needed
    for (const fileName of fileNames) {
      // Fetch the contents of each file
      fetchData(fileName)
        .then(data => {
          // Do something with the data
          console.log('Data for file:', fileName, data);
        })
        .catch(error => {
          console.error('Error fetching data for file:', fileName, error);
        });
    }
  })
  .catch(error => {
    console.error('Error fetching file list:', error);
  });
    
  async function fetchData(fileName) {
    try {
      const response = await axios.get(`${dataDirectory}/${fileName}`);
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
   
   fetchFileList(dataDirectory)
   .then(fileNames => {
    console.log('List of files:', fileNames);
    // Process each file as needed
    for (const fileName of fileNames) {
      // Fetch the contents of each fileSSS
      fetchData(fileName)
        .then(data => {
          // Do something with the data
          console.log('Data for file:', fileName, data);
        })
        .catch(error => {
          console.error('Error fetching data for file:', fileName, error);
        });
    }
   })
   .catch(error => {
    console.error('Error fetching file list:', error);
   });

  async function getRandomAlivePerson() {
    try {
      const response = await axios.get(fileNames);
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
});

},{}]},{},[1]);
