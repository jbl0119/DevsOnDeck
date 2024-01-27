const Developer = require('../models/developer.model');
const Language =  require('../models/language.model');
const Framework = require('../models/framework.model');


module.exports.findAllLanguages = (req, res) => {
    Language.find()
        .then((allDaLanguages) => {
            res.json({ languages: allDaLanguages })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}
module.exports.findAllDevelopers = (req, res) => {
    Developer.find()
        .then((allDaDevelopers) => {
            res.json({ developers: allDaDevelopers })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.findOneSingleDeveloper = (req, res) => {
    Developer.findOne({ _id: req.params.id })
        .then(oneSingleDeveloper => {
            res.json({ developer: oneSingleDeveloper })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewDeveloper = async (req, res) => {
    try {
        // Extract languages array from request body
        const { languages, frameworks, ...developerData } = req.body;

        // Validate that languages is an array
        if (!Array.isArray(languages) || languages.length === 0) {
            return res.status(400).json({ message: 'Languages must be a non-empty array' });
        }
        
        if (!Array.isArray(frameworks) || frameworks.length === 0) {
            return res.status(400).json({ message: 'Frameworks must be a non-empty array' });
        }


        // Create new developer with other fields
        const newDeveloper = new Developer({
            ...developerData,
            languages: languages,
            frameworks: frameworks,
        });

        // Save the document to ensure virtuals are populated
        await newDeveloper.save();

        // Respond with the array of languages
        res.json({ developer: { ...newDeveloper.toJSON(), languages: languages,frameworks: frameworks } });
        console.log(languages);
        console.log(frameworks);
        console.log(newDeveloper);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

module.exports.updateExistingDeveloper = (req, res) => {
    Developer.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedDeveloper => {
            res.json({ developer: updatedDeveloper })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.deleteAnExistingDeveloper = (req, res) => {
    Developer.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
