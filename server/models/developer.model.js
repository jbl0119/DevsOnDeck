const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const DeveloperSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength:[3, "First name must be 3 characters!"],
        maxlength: [20, "First name's length can be no more than 20 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength:[3, "Last name must be 3 characters!"],
        maxlength: [20, "Last name's length can be no more than 20 characters!"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        maxlength: [50, "Addresss length can be no more than 50 characters!"]
    },
    city: {
        type: String,
        required: [true, "City is required"],
        maxlength: [50, "Citys length can be no more than 50 characters!"]
    },
    state: {
        type: String,
        required: [true, "State is required"],
        minlength:[2]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    languages: [{
        type: String,
    }],
    frameworks: [{
        type: String,
    }],
    });

    
DeveloperSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );
// This will check if the `password` and `confirmPassword` fields are the same
DeveloperSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

DeveloperSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

DeveloperSchema.virtual('language', {
    ref: 'DevLanguage',
    localField: '_id',
    foreignField: 'developerId',
});

DeveloperSchema.virtual('framework', {
    ref: 'DevLanguage',
    localField: '_id',
    foreignField: 'developerId',
});

// Static method to validate login credentials
DeveloperSchema.statics.validateLogin = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

// Static method to validate registration data
DeveloperSchema.statics.validateRegistration = async function (registrationData) {
    // Validate registration data here

    // For example, check if the email is unique
    const existingUser = await this.findOne({ email: registrationData.email });
    if (existingUser) {
        throw new Error("Email is already registered");
    }

    // Add more validation logic as needed

    return true; // Return true if validation passes
};


const Developer = mongoose.model('Developer', DeveloperSchema);
 
module.exports = Developer;
