const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const OrganizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: [true, "Organization name is required"],
        minlength:[3, "Organization name must be 3 characters!"],
        maxlength: [20, "Organization name cannot be more than 20 characters!"]
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength:[3, "First name must be 3 characters!"],
        maxlength: [20, "First name cannot be more than 20 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength:[3, "Last name must be 3 characters!"],
        maxlength: [20, "Last name cannot be more than 20 characters!"]
    },
    contactEmail: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    orgAddress: {
        type: String,
        required: [true, "Address is required"],
        maxlength: [50, "Addresss cannot be more than 50 characters!"]
    },
    orgCity: {
        type: String,
        required: [true, "City is required"],
        maxlength: [50, "City cannot be more than 50 characters!"]
    },
    state: {
        type: String,
        required: [true, "State is required"],
        minlength:[2]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    Position: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position'
    }],
});

// Define virtual field for positions
OrganizationSchema.virtual('positions', {
    ref: 'Position',
    localField: '_id',
    foreignField: 'organizationId',
});

OrganizationSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword;
    })
    .set(function(value) {
        this._confirmPassword = value;
    });

// This will check if the `password` and `confirmPassword` fields are the same
OrganizationSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

OrganizationSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err));
});

OrganizationSchema.statics.validateLogin = async function (loginData) {
    const user = await this.findOne({ contactEmail: loginData.contactEmail });

    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(loginData.password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

// Static method to validate registration data
OrganizationSchema.statics.validateRegistration = async function (registrationData) {
    // Validate registration data here
    const existingUser = await this.findOne({ contactEmail: registrationData.contactEmail });
    if (existingUser) {
        throw new Error("Email is already registered");
    }

    return true; // Return true if validation passes
};

const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;
