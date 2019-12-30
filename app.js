//Here I storing in the variable express. After this I will use this variable to call epxress
const express = require('express');
//Here I create the variable app and sotre the call for express function
const app = express();
//Here I tell express to use the public dir 
app.use(express.static('public'))
//Here we set express to render the html set method must have two arguments firs must be the views this is the default by express and second argument are the name of folder in which we'll create our views
app.set('views', 'views');
//With this we tell expess which template engine we'll be use for rednering. Here I will be use the ejs template engine. To working like it should we must install the ejs package from npm. We instal it with this line of code in terminal npm install ejs
app.set('view engine', 'ejs');

//Here I tell the express what will be done when user sends get request to the home page. The code in the function will be trigered after the user sends get request to the home page
app.get('/', function(req, res){
//Here I call the render method and pased it a argument with the name of file which will rendered. This file must be in folder of views as we above provided the express look in that folder and look the ejs files
    res.render('home-guest');
});
//Here I tell my app to listens port 3000. This mean when user send request with port of 3000 like localhost:3000 than the express will do the funciton above
app.listen(3000)