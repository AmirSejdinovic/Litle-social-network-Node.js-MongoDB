//Require the db connection and looking into the users table
const usersCollection = require("../db").collection("users");

//Importing the validator pakage
const validator = require("validator");

//Crating the construct which will be a bluebprint
//Inside of the function I created the parametar which will be reciving the data form arguments insde calling this constructor function. This parametar will have the input data as JSON format
let User = function(data){
   //Whit tihs we taking the data tha was pased in as argument in callin function and storing it with proprety
  this.data = data;
  this.errors = [];
   
}
//Creating the clean up method
//I creating the method via prototype 
User.prototype.cleanUp = function(){
  //In this if statement I checking if the inputed username is not string. If it is not a string than assigne the username empty string
  if(typeof(this.data.username)  != "string"){
     this.data.username = "";
  }
//If the email is not type of string
  if(typeof(this.data.email) != "string"){
   this.data.email = "";
  }
//If the password is not type of string
  if(typeof(this.data.password) != "string"){
    this.data.password = "";
  }

  //Get rid of any bogus propreties
  //Here I update the data and assigned it as object and pase in only parametars I want to collect from users.
  //Method trim() is method which trim all white or blank space in input
  //Method toLowerCase() is method which converts all characters in input in lower casess
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}
//Creating the validate method
User.prototype.validate = function(){
  //If the data from the username is empty do this
   if(this.data.username == ""){
     //If the username is empty than push this text inside the errors porptey that i defined above
      this.errors.push("You must provide username");

   }
   //If the user type something in the usrenmane filed than valdiate that input value
   //With the validators method of isAlphanumeric we can chack if the input valie is aplphanumeric
   if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)){
     this.errors.push("Username can only containe letters and numbers");

   }
   //Calling the validator in the if statement. In the argument of the isEmail method we type the code for the input filed value If the email is valid the code will not run 
   if(!validator.isEmail(this.data.email)){
    
     this.errors.push("You must provide a valid  email");
     
  }
  if(this.data.password == ""){
    //If the username is empty than push this text inside the errors porptey that i defined above
     this.errors.push("You must provide a password");
     
  }
  //If statement for cheking if the user is inputed the password is more than 12 caharaters long
  if(this.data.password.length > 0 && this.data.password.length < 12){
    this.errors.push("Password must bee at least 12 cahraterst")
  }
  //Whit this I checked that the password is not lenght more than 100 charachers
  if(this.data.password.length > 100){
     this.errors.push("Password canot  exceed 100 characters");
  }
  //Cheking the usrename cahracters
  if(this.data.username.length > 0 && this.data.username.length < 3){
    this.errors.push("Usrename must be more than 3 charahers long");
  }
  //cheking the usrnema
  if(this.data.username.length > 30){
    this.errors.push("The usrname could not be more than 30 characthers");
  }


}
//With this way I created the method in User constructor. This way of creating methods is much better because if we created the metod on this way we do not have a copy instance of this metod for each new instance but all of that new instance of the constructor will have the acces to this method. With this form we as pototype of the user created method which wil be one and all of instance of thaht constructor function will have acees to him. If we created the method on the old way as the function inside the constructor function this will copy that method every time when this constructor will be called
User.prototype.register = function(){
  this.cleanUp();
   //Step no1: Validate user data
   //Caling the validate method. I created it above
    this.validate();
   //Step no2: Only if there are no validation errors then save the user data into database
   //If there have no errors than do this
   if(!this.errors.length){
       usersCollection.insertOne(this.data);
   }

}
//Exports the function so I can use it in another file
module.exports = User;