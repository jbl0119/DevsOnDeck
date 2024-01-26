const Developer = require('../models/developer.model');
 
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
 
module.exports.createNewDeveloper = (req, res) => {
    Developer.create(req.body)
        .then(newlyCreatedDeveloper => {
            res.json({ developer: newlyCreatedDeveloper })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
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
