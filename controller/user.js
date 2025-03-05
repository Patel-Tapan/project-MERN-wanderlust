const User =  require("../models/user.js"); 

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
 };


 module.exports.signup = async (req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
       const registeredUser = await User.register(newUser, password);
       req.login(registeredUser, (err) => {
         if(err){
            return next(err);
         }
      req.flash("sucess", "Welcome to WanderLust");
      res.redirect("/listings");
      });
    } catch(e){
        req.flash("error", e.message);
       res.redirect("/signup");
    }
 };




 module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
 };




 module.exports.Login = async(req, res) =>{
    req.flash("sucess", "Welcome back to wanderLust");
    let saveUrl = res.locals.redirectUrl || "/listings";
    res.redirect(saveUrl);
      };

      module.exports.Logout = (req, res, next) => {
        req.logout((err) => {
           if(err){
              return next(err);
           }
        req.flash("sucess", "You are Logged Out!");
        res.redirect("/listings");
        });
     };