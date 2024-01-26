const mongoose = require('mongoose');

const FrameworkSchema = new mongoose.Schema({
    name: { type: String},
})

const Framework = mongoose.model('Framework',FrameworkSchema );
module.exports = Framework