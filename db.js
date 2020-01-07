//Importing the dotenvpackage whit this package I will load my env variable
const dotenv = require("dotenv");
//Calling the config method on dotenv package. After this this package will load all variables we defined in .env file
dotenv.config();

//Importing the mongodb packate. This package will hellp me to connect with mongo db
const mongodb = require("mongodb");

//conecting ond mongodb wia mongodb package and method connect()
//proecess.env.nameof variable whic is defined in the .env file this will return value from that variable
mongodb.connect(process.env.CONNECTIONSTRING,{useNewUrlParser: true, useUnifiedTopology: true},function(err, client){
   
  module.exports = client.db();
   //Importing the express aplication from the app.js file
  const app = require('./app');
  //After the connection with the database is established than listen to the port of 3000
  app.listen(process.env.PORT);
});