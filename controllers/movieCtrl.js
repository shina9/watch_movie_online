const Movies = require('../models/movieModel')


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    // tìm kiếm
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryStr))

        return this;
    }
    // sắp xếp
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    // đánh số trang
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const movieCtrl = {
    getMovies: async (req, res) => {
        try {
            const features = new APIfeatures(Movies.find(), req.query).filtering().sorting().paginating()

            const movies = await features.query

            res.json({
                status: 'success',
                result: movies.length,
                movies: movies
            })
            // console.log(movies);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createMovie: async (req, res) => {
        try {
            const { title, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })

            const movie = await Movies.findOne({ title })
            if (movie) return res.status(400).json({ msg: "This movie already exists." })

            const newMovie = new Movies({
                title: title.toLowerCase(), description, content, images, category
            })

            await newMovie.save()
            res.json({ msg: "Created a movie successfully" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteMovie: async (req, res) => {
        try {
            await Movies.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted movie successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateMovie: async (req, res) => {
        try {
            const { title, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })

            await Movies.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), description, content, images, category
            })
            res.json({ msg: "Updated a movie successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

}


module.exports = movieCtrl