//Importing the express
const express = require('express');
//Calling the express methor Router()
const router = express.Router();
//Here I tell the express what will be done when user sends get request to the home page. The code in the function will be trigered after the user sends get request to the home page
router.get('/', function(req,res){
  //Here I call the render method and pased it a argument with the name of file which will rendered. This file must be in folder of views as we above provided the express look in that folder and look the ejs files
   res.render('home-guest');
});

router.get('/about', function(req,res){
  res.send("Cao");
});

//Exportting the router which I will fetch in the app.js
module.exports = router;