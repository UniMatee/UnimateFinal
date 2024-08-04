const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profilePicture: {
        type: String,
        default: 'default_profile.jpg' 
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        default: ''
    },
    otherLink: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
