const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: { type: String},
})

const Language = mongoose.model('Language',LanguageSchema );
module.exports = Language