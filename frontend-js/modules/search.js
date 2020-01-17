//Importing the axios package
import axios from 'axios';

//JS class new sintax because it I use babel to render this code on valid JS for all type of browsers
export default class Search{
  //1. Create propreties to select DOM elements and keep track of any useful data
  constructor(){
    //Calling the inject html function
    this.injectHTML();
    this.headerSearchIcon = document.querySelector(".header-search-icon");
    //Creating the property for storing the css class value which will select div of search overlay
    this.overlay = document.querySelector('.search-overlay');
    //Selecting closing icon
    this.closeIcon = document.querySelector(".close-live-search");
    //Selecting the input field
    this.inputField = document.querySelector("#live-search-field");
    //Selecting the container for displaying results
    this.resulrsArea = document.querySelector(".live-search-results");
    //Selecting loader element
    this.loaderIcon = document.querySelector(".circle-loader");
    //Create typinwaitTimer
    this.typingWaitTimer;
    //Creating proprety of previus value
    this.previusValue = "";
    //Caling the events method in the constructor
    this.events();

  }

  //2. Events 
  //Creating events method through class 
  events(){
    //Event listener for loader key up on input
    this.inputField.addEventListener("keyup", ()=>{
      //Caling the keypress method 
       this.keyPressHandler();
    })
    this.closeIcon.addEventListener("click", ()=>{
      //Calling the method of closeOverlay
        this.closeOverlay();
    });
    this.headerSearchIcon.addEventListener("click",(e)=>{
      //With this I prevent default behaviour of html a element
      e.preventDefault();
      //Caling method openOverlay whic I created below and which will triger the open overlay when someone cliks on the search icon
      this.opentOverlay();
    })
  }

  //3. Methods
  //Creating method for loader etc when someone cliks on input filed than start the loader
  keyPressHandler(){
    //Creating the variable value and asiginig it the current value of input field
    let value = this.inputField.value;

    //If the value is not empy and is not empy string etc previus value, than do this code
    if(value != "" && value != this.previusValue){
      //Reseting timer
      clearTimeout(this.typingWaitTimer);
      //Calling the showloader icon method
       this.showLoaderIcon();
       this.typingWaitTimer = setTimeout(()=>{
         //Calling the method sencRequest
          this.sendRequest();
       },3000);

    }


    //Upadting the previus value with value of input field
    this.previusValue = value;
  }
   //Method for send requests
  sendRequest(){
    //Calling the axios and adding the post method inside this method i provide the first the url than the second parametar is the value which will bee send via this request in my case it is the current value of input field
    //Because axios is return the promes i added then and catch method
    axios.post('/search', {searchTerm: this.inputField.value}).then(()=>{

    }).catch(()=>{
       alert("Hello the reuqest failed");
    });
  }
  //Creating the show loader method
  showLoaderIcon(){
    this.loaderIcon.classList.add("circle-loader--visible");
  }
  //Creating method inside the class. This method will calle above in the eventlistener and this method will open the overlay for search 
  opentOverlay(){
    //Adding the visilbe calss to overlay div
    this.overlay.classList.add("search-overlay--visible");
     //Calling the setTimeout method which will wait to 50 ms and than will do the code. This is because it will have an issue on old browsers if I do not put it in the timeout method
     setTimeout(()=>{
       //This will focuse the inputField or another words it will place user cursor so it becaome to type.
    this.inputField.focus();
     },50);
    
  }
  //Method for closing the overlay
  closeOverlay(){
     this.overlay.classList.remove("search-overlay--visible");
  }
   //Method for injecting html of overlay
  injectHTML(){
    //Inserting the html inside the body element. This insertAdjecentHTML recive two arguments first is where the code will be placed and second is the html
    document.body.insertAdjacentHTML('beforeend', `
    <!-- search feature begins -->
  <div class="search-overlay">
    <div class="search-overlay-top shadow-sm">
      <div class="container container--narrow">
        <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
        <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
        <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
      </div>
    </div>

    <div class="search-overlay-bottom">
      <div class="container container--narrow py-3">
        <div class="circle-loader"></div>
        <div class="live-search-results">
          <div class="list-group shadow-sm">
            <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>

            <a href="#" class="list-group-item list-group-item-action">
              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #1</strong>
              <span class="text-muted small">by barksalot on 0/14/2019</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #2</strong>
              <span class="text-muted small">by brad on 0/12/2019</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #3</strong>
              <span class="text-muted small">by barksalot on 0/14/2019</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #4</strong>
              <span class="text-muted small">by brad on 0/12/2019</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- search feature end -->
    
    `);
  }

}

