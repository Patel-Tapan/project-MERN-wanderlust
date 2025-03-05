const express = require("express");
const router = express.Router();
const User =  require("../models/user.js"); 
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js");

        // signup (GET) (POST)
 router.route("/signup").get( userController.renderSignupForm)
 .post( wrapasync(userController.signup));


  // login (get) (post)

  router.route("/login").get( userController.renderLoginForm)
  .post( saveRedirectUrl, 
   passport.authenticate("local", 
   { failureRedirect:"/login" ,
    failureFlash: true, }),

    userController.Login  );


   //logout
   router.get("/logout", userController.Logout);

module.exports = router;