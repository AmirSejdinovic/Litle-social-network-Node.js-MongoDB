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
    //Caling the events method in the constructor
    this.events();

  }

  //2. Events 
  //Creating events method through class 
  events(){
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
  //Creating method inside the class. This method will calle above in the eventlistener and this method will open the overlay for search 
  opentOverlay(){
    //Adding the visilbe calss to overlay div
    this.overlay.classList.add("search-overlay--visible");
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
        <div class="live-search-results live-search-results--visible">
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

