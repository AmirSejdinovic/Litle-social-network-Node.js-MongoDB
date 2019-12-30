//Here I storing in the variable express. After this I will use this variable to call epxress
const express = require('express');

const router = require('./router');


//Here I create the variable app and sotre the call for express function
const app = express();
//Here I tell express to use the public dir 
app.use(express.static('public'))
//Here we set express to render the html set method must have two arguments firs must be the views this is the default by express and second argument are the name of folder in which we'll create our views
app.set('views', 'views');
//With this we tell expess which template engine we'll be use for rednering. Here I will be use the ejs template engine. To working like it should we must install the ejs package from npm. We instal it with this line of code in terminal npm install ejs
app.set('view engine', 'ejs');
//Here I call method of use and pased two arguments first is the url for which I will use the router and the second is the variable which contains router cll
app.use('/',router);

//Here I tell my app to listens port 3000. This mean when user send request with port of 3000 like localhost:3000 than the express will do the funciton above
app.listen(3000)