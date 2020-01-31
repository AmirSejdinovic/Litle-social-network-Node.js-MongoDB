//Importing the search module from modules file
import Search from './modules/search';
//Importing chat calsss
import Chat from './modules/chat';
//Importing registration from from the modules folder
import RegistrationForm from './modules/registrationFrom';
//Run this code only if on don has registrtion form
if(document.querySelector("#registration-form")){
     //Creating the new instac of class
     new RegistrationForm();
}
//Only if this element egzists on the dom than do this code in if block
if(document.querySelector("#chat-wrapper")){
    //Creating the new instance, thos will triget the consturctor and will passe all config from it
     new Chat();
}

//Only if this element exists on DOM create new instace of the class. 
if(document.querySelector(".header-search-icon")){
  //Creating new instance of Search class.This trigar our constructor from class and set everything in motion
  new Search();
}



