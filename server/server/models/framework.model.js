const mongoose = require('mongoose');

const FrameworkSchema = new mongoose.Schema({
    name: { type: String},
})
FrameworkSchema.virtual('developer', {
    ref: 'DevLanguage',
    localField: '_id',
    foreignField: 'frameworkId',
  });
const Framework = mongoose.model('Framework',FrameworkSchema );
module.exports = Framework