const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

// router lấy cmt list, tạo và xóa cmt

router.route('/comment')
    .get(commentCtrl.getComments)
    .post(auth, commentCtrl.createComment)

router.route('/comment/:id')
    .delete(auth, commentCtrl.deleteComment)



module.exports = router