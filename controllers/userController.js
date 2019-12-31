//Importing the model of user
const User = require('../models/User');

exports.login = function(){
  
}

exports.logout = function(){
  
}
//This function will be called when someone click on registration form on the button submit
exports.register = function(req, res){
    //Here I crete a new instace of User or construor function. This new user will inherited all the propreties and methods from the constructor this is like the class in php. This will created a new object using the propreties and methods form constructor.
    //In the calling the new User i pased the argument of the req.body. This line of code will pass the input of the user as json file. We enabled this inside the app.js
    let user = new User(req.body);
    //Whith this we call method on new instace of user. Method is stored as prototype in the app.js
    user.register();
   
    res.send("Thanks for trying to register");
}
//This function will be called when someone visits base url
exports.home= function(req,res){
   res.render('home-guest'); 
}

