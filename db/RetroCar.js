const {Schema, model} = require('mongoose');

const RetroCarSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        trim: true,
        min: 1885,
        max: 1980
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    password: {
        type: String,
        min: 8,
        max: 128,
        required: true,
        trim: true
    }
}, {timestamps: true});

module.exports = model('cars', RetroCarSchema);
