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
      { name: 'React.js', icon: 'react' },
      { name: 'Angular', icon: 'angularjs' },
      { name: 'Django', icon: 'django' },
      { name: 'Vue.js', icon: 'vuejs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name:'Flask', icon: 'flask' },
      { name:'Word Press', icon: 'wordpress' },
      { name:'Azure', icon: 'azure' },
      { name:'Bootstrap', icon: 'bootstrap' },
      { name:'BackBone.Js', icon: 'backbonejs' },
      { name:'Spring Boot', icon: 'spring' },
      { name:'Apache Struts', icon: 'apache' },
      { name:'Tail Wind CSS', icon: 'tailwindcss' },
      { name:'Unreal Engine', icon: 'unrealengine' },
      { name:'Socket.IO', icon: 'socketio' },
      { name:'Laravel', icon: 'laravel' },
      { name:'Symfony', icon: 'symfony' },
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
