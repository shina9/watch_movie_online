const Users = require('../models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        // Lấy dữ liệu user theo id
        const user = await Users.findOne({
            _id: req.user.id
        })
        // Nếu user_role = 0 thì từ chối access
        if (user.role === 0)
            return res.status(400).json({ msg: "Access denied" })

        next()

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin