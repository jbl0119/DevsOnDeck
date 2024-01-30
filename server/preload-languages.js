const fs = require('fs').promises;
const mongoose = require('mongoose');
const Language = require('./models/language.model');

async function preloadLanguages() {
  try {
    // Fetch all existing languages from the database
    const existingLanguages = await Language.find();

    // Define default languages
    const defaultLanguages = [
      {name:'C', icon: 'c'},
      {name:'C++', icon: 'cplusplus'},
      {name:'Java', icon: 'java'},
      {name:'C#' , icon: 'csharp'},
      {name:'Swift' , icon: 'swift'},
      {name:'HTML' , icon: 'html5'},
      {name:'CSS' , icon: 'css3'},
      {name:'JavaScript' , icon: 'javascript'},
      {name:'PHP' , icon: 'php'},
      {name:'TypeScript', icon: 'typescript'},
      {name:'Kotlin' , icon: 'kotlin'},
      {name:'Python' , icon: 'python'},
      {name:'Ruby' , icon: 'ruby'},
      {name:'F#' , icon: 'fsharp'},
      {name:'MySQL', icon: 'mysql'},
      {name:'R' , icon: 'r'},
      {name:'Go' , icon: 'go'},
      {name: 'Scala', icon: 'scala'},
      {name: 'Rust', icon: 'rust'},
      {name: 'Dart', icon: 'dart'},
      {name: 'Haskell', icon: 'haskell'},
      {name: 'Lua', icon: 'lua'},
      {name: 'Perl', icon: 'perl'},
      {name: 'Clojure', icon: 'clojure'},
      {name: 'Elixir', icon: 'elixir'},
      {name: 'Erlang', icon: 'erlang'},
      {name: 'Groovy', icon: 'groovy'},
      {name: 'Matlab', icon: 'matlab'},
      {name: 'Objective-C', icon: 'objectivec'},
      // Add more default languages as needed
    ];
    

    // Filter out languages that already exist in the database
    const newLanguages = defaultLanguages.filter((defaultLang) => {
      return !existingLanguages.some((existingLang) => existingLang.name === defaultLang.name);
    });

    if (newLanguages.length > 0) {
      // Insert only the new languages
      await Language.insertMany(newLanguages);
      console.log('New languages inserted into the database:', newLanguages);

      // Touch a temporary file to trigger nodemon
      await fs.writeFile('nodemon-restart.tmp', '');
    } else {
      console.log('No new languages to insert.');
    }

    console.log('Languages preloaded successfully.');
  } catch (error) {
    console.error('Error preloading languages:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/DevsonDeck', {});

// Run the function to preload languages
preloadLanguages();
