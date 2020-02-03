import axios from 'axios';
import { response } from 'express';

export default class RegistrationForm{
  constructor(){
    this.form = document.querySelector("#registration-form");
    this.allFields = document.querySelectorAll("#registration-form .form-control");
    this.insertValidationElements();
    this.username = document.querySelector("#username-register");
    this.username.previousValue = "";
    this.email = document.querySelector("#email-register");
    this.emai.previousValue = "";
    this.password = document.querySelector("#password-register");
    this.password.previousValue = "";
    this.username.isUnique = false;
    this.email.isUnique = false;
      this.events();

  }
  //Events
  events(){
    this.form.addEventListener("submit", (e)=>{
      e.preventDefault();
      this.formSubmitHandler()  
    });
     this.username.addEventListener("keyup", ()=>{
       this.isDifferent(this.username, this.usernameHandler)
     });
     this.email.addEventListener("keyup", ()=>{
      this.isDifferent(this.email, this.emailHandler)
    });
    this.password.addEventListener("keyup", ()=>{
      this.isDifferent(this.password, this.passwordHandler)
    });
    

    this.username.addEventListener("blur", ()=>{
      this.isDifferent(this.username, this.usernameHandler)
    });
    this.email.addEventListener("blur", ()=>{
     this.isDifferent(this.email, this.emailHandler)
   });
   this.password.addEventListener("blur", ()=>{
     this.isDifferent(this.password, this.passwordHandler)
   });
  }

  //Methods
  formSubmitHandler(){
    this.usernameImmediatly();
    this.usernameAfterDelay();
    this.emailAfterDelay();
    this.passwordImmediatly();
    this.passwordAfterDelay();

    if(
      this.username.isUnique && 
      !this.username.errors &&
       this.email.isUnique &&
       !this.email.errors &&
       !this.password.errors
       ){
      this.form.sumbit();
    }

  }
  isDifferent(el, handler){
    if(el.previousValue != el.value){
       handler.call(this);
    }  
    el.previousValue = el.value;
  }
  usernameHandler(){
    this.username.errors = false;
    this.usernameImmediatly();
    clearTimeout(this.username.timer);
    this.username.timer = setTimeout(()=> this.usernameAfterDelay(), 800);
  }
  emailHandler(){
    this.email.errors = false;
    clearTimeout(this.email.timer);
    this.email.timer = setTimeout(()=> this.emailAfterDelay(), 800);
  }
  passwordHandler(){
    this.password.errors = false;
    this.passwordImmediatly();
    clearTimeout(this.password.timer);
    this.password.timer = setTimeout(()=> this.passwordAfterDelay(), 800);
  }
  passwordImmediatly(){
    if(this.password.value.length > 50){
       this.showValidationError(this.password, "Password canot exceed 50 characters");
    }
    if(!this.password.errors){
      this.hideValidationError(this.password)
    }
  }
  passwordAfterDelay(){
    if(this.password.value.length < 12){
         this.showValidationError(this.password, "Password must be at least 12 characetes");
    }
  }

  emailAfterDelay(){
    if(!/^\S+@\S+$/.test(this.emai.value)){
       this.showValidationError(this.email, "YOu must provide valid email adress");
      
    }
    if(!this.email.errors){
       axios.post('/doesEmailExist', {email: this.email.value}).then((resposne)=>{
            if(response.data){
              this.email.isUnique = false;
              this.showValidationError(this.email, "Thaht email is alredy is been used")
            }else{
             this.emai.isUnique = true;
             this.hideValidationError(this.email);
            }
       }).catch(()=>{
            console.log("Please try again later");
       })
    }
  }
  usernameImmediatly(){
    if(this.username.value != "" && !/^([a-zA-Z0-9]+)$/.test(this.username.value)){
       this.showValidationError(this.username, "Username can only containe letter and numbers");
    }
    if(this.username.value.length > 30){
       this.showValidationError(this.username, "USername canot exceed 30 characethers");
    }
    if(!this.username.errors){
        this.hideValidationError(this.username);
    }
  }
  hideValidationError(el){
    el.nextElementSibling.classList.remove("LiveValidateMessage--visible");
  }
  showValidationError(el,message){
      el.nextElementSibling.innerHTML = message;
      el.nextElementSibling.classList.add("LiveValidateMessage--visible");
      el.errors = true;
  }
  usernameAfterDelay(){
    if(this.username.value.length < 3){
      this.showValidationError(this.username, "Username must be at least 3 characters");
    }
    if(!this.username.errors){
      axios.post('/doesUsernameExist', {username: this.username.value}).then((response)=>{
         if(response.data){
            this.showValidationError(this.username, "That username is already takene")
            this.username.isUnique = false;
         }else{
           this.username.isUnique = true
         }
      }).catch(()=>{
           console.log("Please try again later");
      });
    }
    
  }
  insertValidationElements(){
    this.allFields.forEach(function(el){
      el.insertAdjacentHTML('afterend', '<div class="alert alert-danger small liveValidateMessage"></div>')
    })
  }
}