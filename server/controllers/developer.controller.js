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
        // Extract language string from request body
        const { Language, ...developerData } = req.body;

        // Validate that Language is a string
        if (typeof Language !== 'string' || !Language) {
            return res.status(400).json({ message: 'Language must be a non-empty string' });
        }

        // Create new developer with other fields
        const newDeveloper = await Developer.create({
            ...developerData,
            language: Language, // Use the Language string directly
        });

        res.json({ developer: { ...newDeveloper._doc, language: { name: Language } } });
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
