const fs = require('fs').promises;
const mongoose = require('mongoose');
const Language = require('./models/language.model');
const Framework = require('./models/framework.model');

async function preloadFrameworks() {
  try {
    // Fetch all existing frameworks from the database
    const existingFrameworks = await Framework.find();

    // Define default frameworks
    const defaultFrameworks = [
      { name: 'React.js' },
      { name: 'Angular' },
      { name: 'Django' },
      { name: 'Vue.js' },
      { name: 'Express.js' },
      {name:'Ruby on Rails'},
      {name:'Flask'},
      {name:'Spring Boot'},
      {name:'ASP.NET'},
      {name:'JavaServer Faces (JSF)'},
      {name:'Apache Struts'},
      {name:'Play Framework'},
      {name:'Sinatra'},
      {name:'Hanami'},
      {name:'Unity'},
      {name:'Unreal Engine'},
      {name:'Phaser'},
      {name:'Socket.IO'},
      {name:'Django Channels'},
      {name:'SignalR'},
      {name:'Laravel'},
      {name:'Symfony'},
      {name:'CodeIgniter'},

      // Add more default frameworks as needed
    ];

    // Filter out frameworks that already exist in the database
    const newFrameworks = defaultFrameworks.filter((defaultFrame) => {
      return !existingFrameworks.some((existingFrame) => existingFrame.name === defaultFrame.name);
    });

    if (newFrameworks.length > 0) {
      // Insert only the new frameworks
      await Framework.insertMany(newFrameworks);
      console.log('New frameworks inserted into the database:', newFrameworks);

      // Touch a temporary file to trigger nodemon
      await fs.writeFile('nodemon-restart.tmp', '');
    } else {
      console.log('No new frameworks to insert.');
    }

    console.log('Frameworks preloaded successfully.');
  } catch (error) {
    console.error('Error preloading frameworks:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/DevsonDeck', {});

// Run the function to preload frameworks
preloadFrameworks();
