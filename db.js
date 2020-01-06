//Importing the mongodb packate. This package will hellp me to connect with mongo db
const mongodb = require("mongodb");
//Conection string value
const  connectionString = 'mongodb://todoappuser:9ORZoTeUChWHNtvp@cluster0-shard-00-00-6hgnx.mongodb.net:27017,cluster0-shard-00-01-6hgnx.mongodb.net:27017,cluster0-shard-00-02-6hgnx.mongodb.net:27017/ComplexApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
//conecting ond mongodb wia mongodb package and method connect()
mongodb.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true},function(err, client){
   
  module.exports = client.db();
   //Importing the express aplication from the app.js file
  const app = require('./app');
  //After the connection with the database is established than listen to the port of 3000
  app.listen(3000);
});