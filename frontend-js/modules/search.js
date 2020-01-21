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

    if(value == ""){
      clearTimeout(this.typingWaitTimer);
      this.hideLoaderIcon();
      this.hideResultsArea();
    }

    //If the value is not empy and is not empy string etc previus value, than do this code
    if(value != "" && value != this.previusValue){
      //Reseting timer
      clearTimeout(this.typingWaitTimer);
      //Calling the showloader icon method
       this.showLoaderIcon();
       this.hideResultsArea();
       this.typingWaitTimer = setTimeout(()=>{
         //Calling the method sencRequest
          this.sendRequest();
       },750);

    }


    //Upadting the previus value with value of input field
    this.previusValue = value;
  }
   //Method for send requests
  sendRequest(){
    //Calling the axios and adding the post method inside this method i provide the first the url than the second parametar is the value which will bee send via this request in my case it is the current value of input field
    //Because axios is return the promes i added then and catch method
    axios.post('/search', {searchTerm: this.inputField.value}).then(response=>{
        console.log(response.data);
        //Calling the method
        this.renderResultsHTML(response.data);
    }).catch(()=>{
       alert("Hello the reuqest failed");
    });
  }
  //Creating the method
  renderResultsHTML(posts){
    //If the array have any items than do the code block
      if(posts.length){
        this.resulrsArea.innerHTML = `
        <div class="list-group shadow-sm">
            <div class="list-group-item active"><strong>Search Results</strong> (${posts.length > 1 ? `${posts.length} items found` : '1 item found'} )</div>
           ${posts.map(post=>{
             let postDate = new Date(post.createdDate);
            
            return `
             <a href="/post/${post._id}" class="list-group-item list-group-item-action">
              <img class="avatar-tiny" src="${post.author.avatar}"> <strong>${post.title}</strong>
              <span class="text-muted small">by ${post.author.username} on ${postDate.getMonth()}/${postDate.getDate()}/${postDate.getFullYear()}</span>
            </a>
             
             `
           }).join('')}
          </div>
        
        `;
      }else{
        this.resulrsArea.innerHTML = `
        <p class="alert alert-danger text-center shadow-sm">Sorry, we could not find any results for that search. </p>
        
        `;
      }

      //Hiding spin loader
      //Calling the method
      this.hideLoaderIcon();

      //Show result area
      //Calling the method
      this.showResultsArea();
  }


  //Creating the show loader method
  showLoaderIcon(){
    this.loaderIcon.classList.remove("circle-loader--visible");
  }

  showResultsArea(){
    this.resulrsArea.classList.add("live-search-results--visible");
  }

  hideResultsArea(){
    this.resulrsArea.classList.remove("live-search-results--visible");
  }



  //Creating the show loader method
  hideLoaderIcon(){
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
          
        </div>
      </div>
    </div>
  </div>
  <!-- search feature end -->
    
    `);
  }

}

