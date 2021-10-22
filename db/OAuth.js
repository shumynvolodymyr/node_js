const {Schema, model} = require('mongoose');
const {dbTablesEnum: {O_AUTH, USERS}} = require('../config');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USERS
    },

    versionKey: false
}, {timestamps: true, versionKey: false});

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(O_AUTH, oAuthSchema);
