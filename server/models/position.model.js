const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
    }],
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters"],
        maxlength: [400, "Description cannot exceed 140 characters"],
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    // Add reference to DevLanguage
    devLanguages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DevLanguage',
    }],
});

// Define virtual field for languages
PositionSchema.virtual('language', {
    ref: 'Language',
    localField: 'languages',
    foreignField: '_id',
});

// Define virtual field for organization
PositionSchema.virtual('organization', {
    ref: 'Organization',
    localField: 'organizationId',
    foreignField: '_id',
});


const Position = mongoose.model('Position', PositionSchema);
module.exports = Position;
