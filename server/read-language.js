// read-languages.js
const fs = require('fs').promises;
const mongoose = require('mongoose');
const Language = require('./models/language.model');

async function readLanguagesAndSaveToFile() {
  try {
    // Fetch the list of languages from the database
    const languages = await Language.find();

    // Save the list of languages to a JSON file
    await fs.writeFile('languages.json', JSON.stringify(languages));

    console.log('Languages read from the database and saved to languages.json successfully.');
  } catch (error) {
    console.error('Error reading languages:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/DevsonDeck', {
})
// Run the function to read languages and save to file
readLanguagesAndSaveToFile();
