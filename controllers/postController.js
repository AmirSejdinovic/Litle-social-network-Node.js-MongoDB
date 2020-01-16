//Importing the posts controller
const Post = require("../models/Post");

//Creating function whic will be called when someone clikcs on crate post button
exports.viewCreateScreen = function(req,res){
  res.render('create-post');
}
//Creating function for when user clicks on sumbmit button on the creating new posts form
exports.create = function(req,res){
  //Creating the new instance of post model
  //In the argument of tpost instace I procide req.body which have the inputed information from visitor
    let post = new Post(req.body, req.session.user._id);
    //Calling the method of Post object
    //This method will return the promise. The promise return resolve or rjecete
    //Because it returns the promise I after the calling the method chanin the .then() and .catch()
    post.create().then(function(newId){
        
      req.flash("success", "New post successufully created.");
      req.session.save(()=> {
        res.redirect(`/post/${newId}`);
      });
        
    }).catch(function(errors){
       errors.forEach(error => req.flash("errors", error));
       req.session.save(()=> res.redirect("/create-post"));
    });
}
//Function for rendering the single post view
//Because our post model will return promise I will created the async function
exports.viewSingle = async function(req,res){
  //try and catch are the default blocks for async function
    try{
      //Creating the varaable and seting up to have the value of Post and method findSIngleBYid
      //In the argument we aceess to the id of the post 
      let post = await Post.findSingleById(req.params.id, req.visitorId);

      res.render('single-post-screen', {post: post});
    }catch{

      res.render('404');

    }
}

exports.viewEditScreen = async function(req,res){
  try{
    let post = await Post.findSingleById(req.params.id);
    if(post.authorId == req.visitorId ){
      res.render("edit-post", {post: post});
    }else{
      req.flash("errors", "You do not have permission to perform that action");
      req.session.save(()=> res.redirect("/"))
    }
  }
  catch{
    res.render("404");
  }
}

exports.edit = function(req,res){
   let post = new Post(req.body, req.visitorId, req.params.id);
   post.update().then(function(status){
     //the post was successfully updated in the database
     // or user did have permission, but there were walidation errors
    if(status == "success"){
      //post was updated in db

      req.flash("succes", "Post successufull updated");
      req.session.save(function(){
        res.redirect(`/post/${req.params.id}/edit`);
      })

    }else{
     post.errors.forEach(function(error){
       req.flash("errors", error);
     })
     req.session.save(function(){
       res.redirect(`/post/<%= req.params.id %>/edit`)
     })
    }
      
   }).catch(function(){
      //a post with the requested id dosne exist
      //or the current cisitor is not the owner of request post
      req.flash("errors", "You do not have permission to perform that action");
      req.session.save(function(){
        res.redirect("/");
      })
   });
}