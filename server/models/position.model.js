const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    title: { type: String},
})

const Position = mongoose.model('Position', PositionSchema);
module.exports = Position;