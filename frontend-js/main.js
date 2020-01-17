//Importing the search module from modules file
import Search from './modules/search';

//Only if this element exists on DOM create new instace of the class. 
if(document.querySelector(".header-search-icon")){
  //Creating new instance of Search class.This trigar our constructor from class and set everything in motion
  new Search();
}

