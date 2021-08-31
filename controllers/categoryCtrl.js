const Category = require('../models/categoryModel')
const Movies = require('../models/movieModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
            //console.log(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // nếu user có role là 1 ---> admin
    // chỉ admin mới có thể chỉnh sửa category
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "Created a category successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const movies = await Movies.findOne({ category: req.params.id })
            if (movies) return res.status(400).json({
                msg: "Please delete all movies with a relationship."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a category successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated a category successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = categoryCtrl