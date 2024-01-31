const Organization = require('../models/organization.model');
const Position = require('../models/position.model');


//CREATE - CREATE A NEW ORGANIZATION
module.exports.createNewOrganization = async (req, res) => {
    try { 
        // GET POSITION
        const { position, ...organizationData } = req.body;

        // VALIDATE DATA TYPE
        if (typeof Position !== 'string' || !Position) {

            return res.status(400).json(
                { message: 'Position must be a string' });
        }

        const newOrganization = await Organization.create({
            ...organizationData,
            position: Position, 
        });

        res.json({ organization: { ...newOrganization._doc, position: { name: Position } } });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

//READ - FIND ALL AVAILABLE POSITIONS FOR ORGANIZATION
module.exports.findAllPositions = (req, res) => {
    Position.find()
        .then((allPositions) => {
            res.json({ positions: allPositions })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}
//READ - FIND ALL ORGANIZATIONS
module.exports.findAllOrganizations = (req, res) => {
    Organization.find()
        .then((allOrganizations) => {
            res.json({ organizations: allOrganizations })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

//READ - FIND ONE ORGANIZATION BY ID
module.exports.findOneOrganization = (req, res) => {
    Organization.findOne({ _id: req.params.id })
        .then(oneOrganization => {
            res.json({ organization: oneOrganization })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}


//UPDATE - UPDATE ONE ORGANIZATION BY ID
module.exports.updateExistingOrganization = (req, res) => {
    Organization.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedOrganization => {
            res.json({ organization: updatedOrganization })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

//DELETE - DELETE ONE ORGANIZATION BY ID
module.exports.deleteAnExistingOrganization = (req, res) => {
    Organization.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}