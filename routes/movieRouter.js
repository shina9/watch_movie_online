const router = require('express').Router()
const movieCtrl = require('../controllers/movieCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/movies')
    .get(movieCtrl.getMovies)
    .post(auth, authAdmin, movieCtrl.createMovie)


router.route('/movies/:id')
    .delete(auth, authAdmin, movieCtrl.deleteMovie)
    .put(auth, authAdmin, movieCtrl.updateMovie)


module.exports = router