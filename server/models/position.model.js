const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    title: { type: String},

    Language: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language' 
    }],

    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters"],
        maxlength: [140, "Description cannot exceed 140 characters"]
    },
})
PositionSchema.virtual('language', {
    ref: 'DevLanguage',
    localField: '_id',
    foreignField: 'positionId',
});
const Position = mongoose.model('Position', PositionSchema);
module.exports = Position;