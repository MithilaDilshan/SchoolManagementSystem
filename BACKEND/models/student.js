const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String
    },
    birthday: {
        type: String,
        required: true,
        trim: true
    }

});
const Image = mongoose.model('student', ImageSchema)
module.exports = Image