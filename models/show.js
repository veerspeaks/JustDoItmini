const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;