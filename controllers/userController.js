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
      //Calling session on req object and creatihg the user proprety whic have this object
      req.session.user = {favColor: "blue", username: user.data.username}; 
      //Creating the ssesion and save method inside this method we put the callback function and after the save method do its job this callback function will be trigered and all code inside of it will run. I put there the redirect method
      req.session.save(function(){
          //Redirect to the home url
        res.redirect('/');
      })
   }).catch(function(e){
       res.send(e);
   });
}
//This function will be called when user cliks on the logout button, after that router will be called and procced to this function. Here I provide two parametars req and res for request and response 
exports.logout = function(req,res){
    //After the user cliks on the button of sign out this function will be trigered and it will call the req with session method destroy. If the req have cookie with session ID this method of destroy will find that cookie and destroy it.
    //In the argument of this method I set the callback function which will be trigered after the destroy method destroy the session id in the database. After that it will trigered the callback function and it will redirect the to the home page with the redirect method in which I provided the url to home
   req.session.destroy(function(){
       res.redirect('/');
   });
   
   
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
    //This if statement will if the user have the session or it has loged in do the code of the if block, and if the user do not have the session than will be done the else code block
   if(req.session.user){
 
    //Render the view
     res.render('home-dashboard', {username: req.session.user.username});
   }else{
    res.render('home-guest'); 
   }
}

