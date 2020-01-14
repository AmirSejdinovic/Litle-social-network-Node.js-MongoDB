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
    post.create().then(function(){
        res.send("New Post created");
        
    }).catch(function(errors){
         res.send(errors);
    });
}
//Function for rendering the single post view
//Because our post model will return promise I will created the async function
exports.viewSingle = async function(req,res){
  //try and catch are the default blocks for async function
    try{
      //Creating the varaable and seting up to have the value of Post and method findSIngleBYid
      //In the argument we aceess to the id of the post 
      let post = await Post.findSingleById(req.params.id);

      res.render('single-post-screen', {post: post});
    }catch{

      res.render('404');

    }
}