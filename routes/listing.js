const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const {isLoggedIn, isOwner, ValidateListing} = require("../middleware.js");

const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });





     //  index & create route (also error handle)

     router.route('/')
     .get( wrapAsync(listingController.index))
     .post( isLoggedIn, 
      upload.single('listing[image]'),
      ValidateListing, 
       wrapAsync (listingController.createListing));  

                  // new route 
    router.get("/new", isLoggedIn, listingController.renderNewForm);
                  
               // search 
    router.get("/search", wrapAsync(listingController.searchListing));
      
      
            
      // show route & update route & delete
      router.route("/:id")
      .get( wrapAsync (listingController.showListings))
      .put( isLoggedIn, isOwner, upload.single('listing[image]'), ValidateListing, wrapAsync (listingController.updateListing))
      .delete( isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));
    
    
     
       //EDIT ROUTE 
    router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));
    
    
     module.exports = router;