//Importing the db from db file
//This file is return us only the clinet because of that we must to ad db() and collection method. In the collection method we provide the name of collection 

const usersCollection = require('../db').db().collection("users");
//This will select the follows collection in db
const followsCollection = require('../db').db().collection("follows");
const ObjectId = require('mongodb').ObjectID;


//Creating constructor
//Adding the propreties in the constructor function which I pased as arguments in the calling function
let Follow = function(followedUsername, authorId){
  //Creating the propreties in constructor
  this.followedUsername = followedUsername;
  this.authorId = authorId;
  this.errors = [];

}

//Creating the clenup method
Follow.prototype.cleanUp = function(){
 //Cleaning up the username, if it is not a string than update proprety to empty string
  if(typeof(this.followedUsername) != "string"){
     this.followedUsername = "";
  }

}
//Creating validate function
Follow.prototype.validate = async function(){

  //FollowedUsername must exists in database
  //Mongodb find one will return the promise
  let followedAccound = await usersCollection.findOne({username: this.followedUsername});
  //If we find the document in users collection which matches username
  if(followedAccound){
    //If we find the user than crate propety folloId and asign the id of user accaount
     this.followedId = followedAccound._id; 
  }else{
    //If we do not find account whic is sotred in collections users push the item in the errors aray
    this.errors.push("You cannot follow a user that dose not exist");
  }
}
//Creating the metod for Follow class
//This method will return the promise
Follow.prototype.create = function(){

  //Return the promise
  return new Promise(async (resolve,reject)=>{
    //Caling the method cleanUp
    this.cleanUp();
    //Caling the method validate
    await this.validate();
    //if there are some items in erros array this will validate to trouth but I put the ! sign which means tahat is oposite this now means if there are not any items in errors array do this cod in if block
    if(!this.errors.length){
       //Storing in database
       await followsCollection.insertOne({followedId: this.followedId, authorId: new ObjectId(this.authorId) }); 
       resolve();
    }else{
       //If there are arrros reject
       reject(this.errors);
    }


  });
}

//Export module
module.exports = Follow;