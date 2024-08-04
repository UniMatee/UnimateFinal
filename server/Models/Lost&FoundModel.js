const mongoose = require('mongoose');

const LostFoundSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemPhoto: {
        type: String,
        required: true
    },
    itemMessage: {
        type: String,
        required: true
    },
    itemCharacteristics: [{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 3
    }],
    lastSeenDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LostFoundItem', LostFoundSchema);
