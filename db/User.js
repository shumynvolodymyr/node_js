const {Schema, model} = require('mongoose');
const userRoles = require('../config/user_roles.enum');

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true});

module.exports = model('users', userSchema);
