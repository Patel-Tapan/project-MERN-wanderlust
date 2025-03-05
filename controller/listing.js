const Listing = require("../models/listing.js");

module.exports.index = async (req, res,) => {
  // let {location } = req.query;
  // console.log(location);

    const allListing = await Listing.find({});
    res.render("./listings/index.ejs", {allListing})
}

module.exports.renderNewForm =  (req, res)=> {
    res.render("./listings/new");
  };

  module.exports.showListings = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
       .populate({
         path: "reviews", 
         populate: {
          path: "author",
         },
        }).populate("owner");
    if(!listing){
      req.flash("error", "Listing you requested for does not exists! ");
  res.redirect("/listings");
   }
    res.render("./listings/show.ejs", {listing}); 
   };

   
   module.exports.createListing = async (req, res,) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const Nlisting = new Listing(req.body.listing);
    Nlisting.owner = req.user._id;
    Nlisting.image = {url, filename};
    await Nlisting.save();
    req.flash("sucess", "new listing creted!");
    res.redirect("/listings");
   };

   module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
          req.flash("error", "listing you requested for does not exist! ");
      res.redirect("/listings");
       }
       let originalImgUrl = listing.image.url;
       originalImgUrl = originalImgUrl.replace("/upload", "/upload/c_scale,e_blur:60,w_250");
        res.render("./listings/edit.ejs", {listing, originalImgUrl }); 
  };


  module.exports.updateListing = async (req, res, next) => {
    if(!req.body.listing){
      throw new ExpressError(404, "send valid data for Listing");
    }
    const { id } = req.params;
      let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
      if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image =  {url, filename};
        await listing.save();
      }
      req.flash("sucess", "listing updated!");
    res.redirect(`/listings/${id}`);
   };

   module.exports.destroyListing = async (req, res, next) => {
    const { id } = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("sucess", "listing deleted!");
      res.redirect("/listings");
  
   };


   module.exports.searchListing = async (req, res) => {
    const  q = req.query.search;
     const allListing = await Listing.find({location: `${q}`});
       
     if(allListing.length===0){   
       req.flash("error", "Listing you requested for does not exists! ");
     res.redirect("/listings");
                 }
   else{
       res.render("./listings/index.ejs", {allListing})
    }
        };