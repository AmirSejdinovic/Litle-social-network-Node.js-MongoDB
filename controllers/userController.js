//Importing the model of user
const User = require('../models/User');
//Function for login 
exports.login = function(req,res){
    //Creating the new instance of the user and passing the input as argument
   let user = new User(req.body);
   //Calling the method login. This method I will make in the model file.
   //Inside calling this method I crated the argument as function. This function is the callback function taht means when the method do his job (connecting to the database) than this function will be tirgerd
   //Inside the function i have the parametar of result and taht is the parametars from userModels where I handle if the username and password are corected and created there if statement
   //Calling the promise wiht then and catch

   user.login().then(function(result){
     res.send(result); 
   }).catch(function(e){
       res.send(e);
   });
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
    if(user.errors.length){
        res.send(user.errors);
    }else{
       res.send("Congrats, there are no errors");
    }
}
//This function will be called when someone visits base url
exports.home= function(req,res){
   res.render('home-guest'); 
}

