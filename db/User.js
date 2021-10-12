const {Schema, model} = require('mongoose');

const {userRolesEnum} = require('../config');

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
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
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    versionKey: false
}, {timestamps: true, versionKey: false});

module.exports = model('users', userSchema);
