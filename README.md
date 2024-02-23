# Senior-Assassination-WHS

Senior Assassination is a game where you are a student at a High School and you are trying to kill your classmates. You can do this by using a variety of weapons and items. You can also use your classmates to kill other classmates. The goal of the game is to be the last student standing. And of course, there is a prize pool.

# Installation
To install the game, you will need to download the game files from the GitHub repository. You will need the following requirements to run the game:
```
- Node.js (LTS)
- npm (Node Package Manager)
- MongoDB and MongoDB Compass
```

# Database Setup
You will need to also set up a MongoDB database to store the game data. You can do this by creating a new database in MongoDB Compass and then setting up the database connection in the `mongoconnect.cjs` file. You will need to replace the `uri` variable with your own MongoDB connection string.


# Running the Game Locally
To run this game locally, you will need to run the following commands in the terminal:
```
npm run first-time
```
This will install all the necessary packages and dependencies for the game to run. Then to start the game, run the following command:
```
npm run start
```

# Running the Game Online   
To run this game online, you will need a web server to host the game. You can use a service like Heroku to host the game. Once you have a web server set up, you need to connect it to a working domain to host the game. Occe you have the domain, you can run the auto deploy script to deploy the game to the web server. 
