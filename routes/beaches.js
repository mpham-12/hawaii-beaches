const express = require("express");
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const { isAuthor, isLoggedIn, isOwner, validateReview, validateBeach } = require('../helpers/middleware');
const beaches = require('../controllers/beaches')

//index
router.get('/', catchAsync(beaches.index))

//create
router.get('/new', isLoggedIn, beaches.newForm)

//post
router.post('/', isLoggedIn, validateBeach, catchAsync(beaches.postBeach))

//show
router.get('/:id', catchAsync(beaches.showBeach))

//update
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(beaches.updateForm))

router.put('/:id', isLoggedIn, isOwner, validateBeach, catchAsync(beaches.updateBeach))

//delete
router.delete('/:id', isLoggedIn, isOwner, catchAsync(beaches.deleteBeach))

//post review
router.post('/:id/reviews', isLoggedIn, validateReview, catchAsync(beaches.postReview))

//delete review
router.delete('/:id/reviews/:reviewId', isLoggedIn, isAuthor, catchAsync(beaches.deleteReview))


module.exports = router;