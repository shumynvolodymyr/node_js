const {Schema, model} = require('mongoose');
const {dbTablesEnum: {ACTION, USERS}} = require('../config');

const actionSchema = new Schema({
    action_token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: USERS
    },

    versionKey: false
}, {timestamps: true, versionKey: false});

actionSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(ACTION, actionSchema);
