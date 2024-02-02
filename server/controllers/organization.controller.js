const Organization = require('../models/organization.model');
const Position = require('../models/position.model');


//CREATE - CREATE A NEW ORGANIZATION
module.exports.registerOranization = async (req, res) => {
    const registrationData = req.body;
    
    try {
        await Organization.validateRegistration(registrationData);
        const newOrganization = new Organization(registrationData);
        await newOrganization.save();
        res.json({ success: true, message: 'Registration successful', Organization: newOrganization.toJSON() });
    } catch (error) {
        if (error.errors) {  // Check if the error has a 'errors' property
            const detailedErrors = {};
            for (const field in error.errors) {
                detailedErrors[field] = error.errors[field].message;
            }
            res.status(400).json({ success: false, message: 'Registration failed', error: detailedErrors });
        } else {
            res.status(400).json({ success: false, message: 'Registration failed', error: error.message });
        }
    }
};

module.exports.createPosition = (req, res) => {
    Position.create(req.body)
        .then(newPosition => {
            res.status(200).json({ Position: newPosition })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err })
        });
}

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
//READ - FIND ONE POSITION
module.exports.findOnePosition = (req, res) => {
    Position.findOne({ _id: req.params.id })
    .then(onePosition => {
        res.json({ position: onePosition })
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });}
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
module.exports.loginOrganization = async (req, res) => {
    const loginData = req.body;

    try {
        const user = await Organization.validateLogin(loginData);
        res.json({ success: true, message: 'Login successful', user: user.toJSON() });
    } catch (error) {
        const detailedErrors = {};
        
        if (error.message === "User not found" || error.message === "Invalid password") {
            detailedErrors.contactEmail = "User not found";
            detailedErrors.password = "Invalid password";
        } else if (error.errors) {
            for (const field in error.errors) {
                detailedErrors[field] = error.errors[field].message;
            }
        } else {
            detailedErrors.general = error.message;
        }

        res.status(400).json({ success: false, message: 'Login failed', error: detailedErrors });
    }
};
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
