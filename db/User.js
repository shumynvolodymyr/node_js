const {Schema, model} = require('mongoose');

const {userRolesEnum} = require('../config');

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength: 8,
        maxlength: 128
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 128
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    age: {
        type: Number,
        trim: true,
        min: 0
    },
    picture: {
        type: String,
        trim:true
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
