exports.login = function(){
  
}

exports.logout = function(){
  
}

exports.register = function(req, res){
   res.send("Thanks for trying to register");
}
//This function will be called when someone visits base url
exports.home= function(req,res){
   res.render('home-guest'); 
}

