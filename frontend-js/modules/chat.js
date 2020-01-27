//Exporting the chat class
export default class Chat{
  //Creating class constructor
    constructor(){
      this.opendYet = false;
       //Creating proprety and asign it the dom selector
      this.chatWrapper = document.querySelector("#chat-wrapper");
      //Creating the proprety with asinge of dom element icon
      this.openIcon = document.querySelector(".header-chat-icon");
      
      //Caling the methodd
      this.injectHTML();
      //Creating propretiy for selecting close icon on chat 
      this.closeIcon = document.querySelector("#chat-wrapper > div.chat-title-bar > span");
        //Caling the method
       this.events();
    }

    //Events methods
    events(){
      //Adding the event listener to the icon element
      this.openIcon.addEventListener("click",()=>{
        //When someone is clicked on icon of chat than call this method
        this.showChat();
      });
      //Adding the event listner for the close chat icon
      this.closeIcon.addEventListener("click",()=>{
        this.sakrijChat();
      })

    }
    //Methods
    sakrijChat(){
      this.chatWrapper.classList.remove("chat--visible");
    }
    //Creating the showchat method which will add the class of visible to chat element
    showChat(){
      //If ti is true than do this code
      if(!this.opendYet){
         this.openConnection();
      }
      this.opendYet = true;
      //Addig the class on the chatWrapper this class will enable chat
      this.chatWrapper.classList.add("chat--visible");
    }

    openConnection(){
      alert("oppening a conncetion");
    }
    
    //Creating method injectHTML
    injectHTML() {
      //calling the proprety whic is the dom selector and addign the innerHTML method for adding HTML in that dom element
      this.chatWrapper.innerHTML = `
      <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
      <div id="chat" class="chat-log"></div>

      <form id="chatForm" class="chat-form border-top">
      <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
    </form>
      
      `
    }
}