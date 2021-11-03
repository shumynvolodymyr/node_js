const {Schema, model} = require('mongoose');

const {userRolesEnum, dbTablesEnum: {USERS}} = require('../config');
const {passwordService} = require('../service');
const {sendMail} = require('../service/mail.service');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 32,
    },
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
    image: {
        type: String
    },
    is_active: {
        type: Boolean,
        trim: true,
        default: false
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    versionKey: false
}, {timestamps: true, versionKey: false});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },

    sendMail(action, context) {
        return sendMail(this.email, action, context);
    },
};

userSchema.statics = {
    async createUserWithPassword(userObj) {
        const password = await passwordService.hash(userObj.password);

        return this.create({...userObj, password});
    },

    async updateUserWithNewPassword(_id, newPassword) {
        const password = await passwordService.hash(newPassword);

        return this.updateOne({_id}, {$set: {password}});
    }
};

module.exports = model(USERS, userSchema);
