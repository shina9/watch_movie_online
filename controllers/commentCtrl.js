const Comment = require('../models/commentModel')
const Movies = require('../models/movieModel')


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    sorting() {
        this.query = this.query.sort('-createdAt')
        return this;
    }
}

const commentCtrl = {
    getComments: async (req, res) => {
        try {
            const features = new APIfeatures(Comment.find(), req.query).sorting()

            const comments = await features.query

            res.json(comments)
            // console.log(comments);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createComment: async (req, res) => {
        try {
            const { content, username, movieID, rating } = req.body;
            const newComment = new Comment({ content, username, movieID, rating })

            await newComment.save()
            res.json({ msg: "Created a comment successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a comment successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateComment: async (req, res) => {
        try {
            const { content, rating } = req.body;
            await Comment.findOneAndUpdate({ _id: req.params.id }, { content, rating })

            res.json({ msg: "Updated a comment successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = commentCtrl