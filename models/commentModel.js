const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    content:
    {
        type: String,
        require: true
    },
    movieID: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Comments', commentSchema)