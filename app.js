//Here I storing in the variable express. After this I will use this variable to call epxress
const express = require('express');
//Importing the session npm package 
const session = require('express-session');

const router = require('./router');
//Configure the session package
//Here I write the boilerplate code form npm package
let sessionOptions = session({
  secret: "JavaScript is soo cool",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
});



//Here I create the variable app and sotre the call for express function
const app = express();

//We tell express app to use express sessions and in the argument provide the varialbe of the settings
app.use(sessionOptions);

//This enables us to acces to input data 
app.use(express.urlencoded({extended: false}));
//This will convert input data in json format
app.use(express.json());
//Here I tell express to use the public dir 
app.use(express.static('public'))
//Here we set express to render the html set method must have two arguments firs must be the views this is the default by express and second argument are the name of folder in which we'll create our views
app.set('views', 'views');
//With this we tell expess which template engine we'll be use for rednering. Here I will be use the ejs template engine. To working like it should we must install the ejs package from npm. We instal it with this line of code in terminal npm install ejs
app.set('view engine', 'ejs');
//Here I call method of use and pased two arguments first is the url for which I will use the router and the second is the variable which contains router cll
app.use('/',router);
//Exporting the variable app on which I created the server. The listen method I will be use on file of database connection. And there I will lunch the app only when the databse is fully connected and loaded
module.exports = app;

