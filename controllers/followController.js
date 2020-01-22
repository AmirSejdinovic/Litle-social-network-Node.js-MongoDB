//Importing the Follow model
const Follow = require('../models/Follow');

//Creating the custom function which will be trigered when someone have post request to the rooter
exports.addFollow = function(req,res){
  //Creating new instance of Follow and passing it the username and visitor data
   let follow = new Follow(req.params.username, req.visitorId);
   //Calling new instace and method
   //This will return the promise
   follow.create().then(()=>{
       req.flash("success", `Successufully followed ${req.params.username}`);
       req.session.save(()=> res.redirect(`/profile/${req.params.username}`));
   }).catch((errors)=>{
       errors.forEach((error)=>{
           req.flash("errors", error);
       }) 
       req.session.save(()=> res.redirect('/'));
   });
}

exports.removeFollow = function(req,res){
    //Creating new instance of Follow and passing it the username and visitor data
     let follow = new Follow(req.params.username, req.visitorId);
     //Calling new instace and method
     //This will return the promise
     follow.delete().then(()=>{
         req.flash("success", `Successufully stoped following ${req.params.username}`);
         req.session.save(()=> res.redirect(`/profile/${req.params.username}`));
     }).catch((errors)=>{
         errors.forEach((error)=>{
             req.flash("errors", error);
         }) 
         req.session.save(()=> res.redirect('/'));
     });
  }