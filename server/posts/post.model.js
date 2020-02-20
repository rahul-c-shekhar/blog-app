const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgURL: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    views: {
        type: Number
    },
    comments: {
        type: Number
    }
})

module.exports = mongoose.model('Post', schema);