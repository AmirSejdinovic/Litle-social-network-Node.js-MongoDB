//Importing the db connection
//And this whill create the posts table in the database
const postsCollection = require('../db').db().collection("posts");
//Importing the object id
const ObjectID = require('mongodb').ObjectID;

//This is the consturctor
//In the function as parametar we recive the inputed value because we put in the calling of this object res.body which has the all inputed vale. Here I recive it and I give it a name data. Innside the data variable I will have te users inputed data
//Fatching the userID in the parametar from session
let Post = function(data, userId){
  //Here I storing the inpuded value as data in proprati data which I have to access all araound the object and its prototype methods
  this.data = data;
  //Here I created errors array in which I will push any errors if there been
  this.errors = [],
  this.userId = userId;
}
//Creating method for clenaup
Post.prototype.cleanUp = function(){
    //This values must be string
    if(typeof(this.data.title) != "string"){
      //If the title is not string than update the title and give it a empty varaible
      this.data.title = ""
    }
    //The boody must be string
    if(typeof(this.data.body) != "string"){
      this.data.body ="";
    }
    
    //Get rid of any bofus properties
    //Here I update data nad put what values it can have. If the user try to send the any bogus value whic is not any of this i specify than it will not pase it
    //Here i run the trim method for cleaning up the any empty spaces in inputs
    this.data = {
      title: this.data.title,
      body: this.data.body,
      createdDate: new Date(),
      author: ObjectID(this.userId)
    }
}
//Creating the method for validate
Post.prototype.validate = function(){
  //If the title field is empty do this code block
   if(this.data.title == ""){
    //If the title is empty than push the provided mesage in the errors array
     this.errors.push("You must provide a title");
   }

   //If the body is empty
   if(this.data.body == ""){
     //If the body input is empty than push this string in the errors aray
     this.errors.push("You must enter the body tekst");
   }
}
//Creating the method for Post object via prototype. I use prototaype because it will not call alwais the method when i call the object. This method will be called only when i specialy call it
//Whith this method create I will store the data in database. But before I do that I will call the metohods for cleanup and validate
//This function will return the promise becaues it will be comunicate  whit the database and we would not want to render any content before the proces of comunicate with database is done
Post.prototype.create = function(){
  //Creating the promise
  //Here I use the arrow function because it not modify this keyword
  //inside  this function i put two parametars reoslve and rejcete
  return new Promise((resovle, reject)=>{
    //caling the cleanUp method
    this.cleanUp();
    //Caling the validate method
   this.validate();

    //Checking if the errors aray is empty or not
    //If the array have more than 0 values in it the this.errors.length will return the true. !this.errors.length now means if is the array is epmty
    if(!this.errors.length){
       //Storing post in the database
       //Calling the moethod inserOone and passing the object of this.data
       postsCollection.insertOne(this.data).then(()=>{
         console.log(this.data);
         resovle();
       }).cetch(()=>{
          this.errors.push("Please try again later");
          reject(this.errors);
       });
       
    }else{
     //If there is validation errors
     //Because it is the promise rjecet will be displayed 
     reject(this.errors);

    }
  });

}

//Exporting the Post constructor
module.exports = Post;