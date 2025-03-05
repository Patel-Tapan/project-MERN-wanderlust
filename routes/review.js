const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { ValidateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js"); 

const reviewController = require("../controller/review.js");

    // create review
router.post("/",isLoggedIn, ValidateReview, wrapAsync (reviewController.createReview)); 

// delete review 
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;