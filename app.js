//Here I storing in the variable express. After this I will use this variable to call epxress
const express = require('express');
//Importing the session npm package 
const session = require('express-session');
//Importing the connect-mongo npm package and referece to the session package above
const MongoStore = require('connect-mongo')(session);
//Importing the npm flash connect package and storing it in the constant
const flash = require('connect-flash');
//Importing marked package
const markdown = require('marked');
const sanitizeHTML = require('sanitize-html');




//Configure the session package
//Here I write the boilerplate code form npm package
//Using monogostore to store sessions in the mongodb
let sessionOptions = session({
  secret: "JavaScript is soo cool",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
});



//Here I create the variable app and sotre the call for express function
const app = express();



//We tell express app to use express sessions and in the argument provide the varialbe of the settings
app.use(sessionOptions);
//Adding the flash feature in the application
app.use(flash());

//Creating the midlewere function which will provide us a sessions
app.use(function(req,res,next){

  //make our markdonw function avaible form ejs templates
  res.locals.filterUserHTML = function(content){
    return sanitizeHTML(markdown(content), {allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'i','em','h1','h2','h3','h4','h5','h6'], allowedAttributes: {}});
  }

  //Make all error and succes flash messages avaiable from all tmmpaltes
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  //Make current user id available on the req object
  if(req.session.user){
     req.visitorId = req.session.user._id
  }else{
    req.visitorId = 0;
  }
  //Make user session data available form within wiev temapalte
  res.locals.user = req.session.user;
  next();
})

const router = require('./router');

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

const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.use(function(socket, next){
    sessionOptions(socket.request, socket.request.res, next);
});

io.on('connection', function(socket){
   if(socket.request.session.user){
     let user = socket.request.session.user;
    socket.on('chatMessageFromBrowser', function(data){
      io.emit('chatMessageFromServer', {message: data.message, username: user.username, avatar: user.avatar})
   })
   }
})

//Exporting the variable app on which I created the server. The listen method I will be use on file of database connection. And there I will lunch the app only when the databse is fully connected and loaded
module.exports = server;

