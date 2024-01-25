const mongoose = require('mongoose');
 
const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
});
 
const Developer = mongoose.model('Developer', DeveloperSchema);
 
module.exports = Developer;
