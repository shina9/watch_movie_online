const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// router lấy users list và xóa users

router.route('/users')
    .get(userCtrl.getUsers)

router.route('/users/:id')
    .delete(auth, authAdmin, userCtrl.deleteUser)

module.exports = router