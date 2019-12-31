//Crating the construct which will be a bluebprint
//Inside of the function I created the parametar which will be reciving the data form arguments insde calling this constructor function. This parametar will have the input data as JSON format
let User = function(data){
   //Whit tihs we taking the data tha was pased in as argument in callin function and storing it with proprety
  this.data = data;
   
}
//With this way I created the method in User constructor. This way of creating methods is much better because if we created the metod on this way we do not have a copy instance of this metod for each new instance but all of that new instance of the constructor will have the acces to this method. With this form we as pototype of the user created method which wil be one and all of instance of thaht constructor function will have acees to him. If we created the method on the old way as the function inside the constructor function this will copy that method every time when this constructor will be called
User.prototype.register = function(){

}
//Exports the function so I can use it in another file
module.exports = User;