const Developer = require('../models/developer.model');
const Language =  require('../models/language.model');
const Framework = require('../models/framework.model');


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

    module.exports.registerDeveloper = async (req, res) => {
        const registrationData = req.body;
        
        try {
            await Developer.validateRegistration(registrationData);
            const newDeveloper = new Developer(registrationData);
            await newDeveloper.save();
            res.json({ success: true, message: 'Registration successful', developer: newDeveloper.toJSON() });
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





module.exports.loginDeveloper = async (req, res) => {
    const { email, password } = req.body;

    try {
        const developer = await Developer.validateLogin(email, password);
        res.json({ success: true, message: 'Login successful', developer: developer.toJSON() });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Login failed', error: error.message });
    }
};

module.exports.logOutDeveloper = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Send a success message
        res.json({ msg: 'Logout successful!' });
    });
};


module.exports.updateExistingDeveloper = async (req, res) => {
    const { pickedLanguages, biography, pickedFrameworks } = req.body;
    if(pickedLanguages){
        await Developer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { languages: pickedLanguages, biography } }, // Update only languages and biography
        { new: true, runValidators: true }
        )
        .then(updatedDeveloper => {
            res.json({ developer: updatedDeveloper })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
    }
    else {
        await Developer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { frameworks: pickedFrameworks} }, // Update only frameworks
        { new: true, runValidators: true }
        )
        .then(updatedDeveloper => {
            res.json({ developer: updatedDeveloper })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
    }
}


module.exports.deleteAnExistingDeveloper = (req, res) => {
    Developer.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}


// Modules for Languages

module.exports.findAllLanguages = (req, res) => {
    Language.find()
        .then((allDaLanguages) => {
            res.json({ languages: allDaLanguages })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

// Modules for Frameworks

module.exports.findAllFramework = (req, res) => {
    Language.find()
        .then((allDaFramework) => {
            res.json({ frameworks: allDaFramework })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}
// Modules for Frameworks

module.exports.findAllFramework = (req, res) => {
    Framework.find()
        .then((allDaFramework) => {
            res.json({ frameworks: allDaFramework })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}


