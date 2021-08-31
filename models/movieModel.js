const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: false
    },
    category: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Movies", movieSchema)