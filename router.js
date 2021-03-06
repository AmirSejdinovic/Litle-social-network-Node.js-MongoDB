//Importing the express
const express = require('express');
//Calling the express methor Router()
const router = express.Router();
//Importing the userControllers from which I will be use the functions in this router file
const userController = require('./controllers/userController');
//Importing the postcontroller
const postController = require('./controllers/postController');
//Importing the followController
const followController = require('./controllers/followController');
//Here I tell the express what will be done when user sends get request to the home page. The code in the function will be trigered after the user sends get request to the home page
//This is the new whay of rednering conde on home page. Now when the user require the home url this will goo to folder controllers and find the userController and use the home function. In thah function I include the render for the home page.Also when I use this I must imoprt or require the file from thath file
router.get('/', userController.home);

//Here I created the router for the register page. This mean when someone hit the submit button on the registration form that this controller will bi trigered. This router I created with the post method this is because the form have the action attribute of post
router.post('/register', userController.register );

//Here I created the rout for login fomr
//The second argument is the function which will be crated in the userControler and named login
router.post('/login', userController.login);
//Creating the router for logout button 
router.post('/logout', userController.logout);
router.post('/doesUsernameExist', userController.doesUsernameExist);
router.post('/doesEmailExist', userController.doesEmailExist);

//POST RELATED ROUTES
//Create post router
//Here I include mutlitpe functios the frist funstion mustbelogedin will alow to render the view only to users which are logedin
router.get('/create-post', userController.mustBeLoggedIn ,postController.viewCreateScreen);

//Create post router for creating posts 
router.post('/create-post', userController.mustBeLoggedIn, postController.create);


//router for single
router.get('/post/:id', postController.viewSingle);
router.get('/post/:id/edit',userController.mustBeLoggedIn ,postController.viewEditScreen);
router.post('/post/:id/edit', userController.mustBeLoggedIn , postController.edit);
router.post('/post/:id/delete', userController.mustBeLoggedIn , postController.delete);
router.post('/search', postController.search);

//PROFILE RELATED ROUTES
router.get('/profile/:username', userController.ifUserExists, userController.sharedProfileData ,userController.profilePostsScreen);
router.get('/profile/:username/followers', userController.ifUserExists, userController.sharedProfileData ,userController.profileFollowersScreen);
router.get('/profile/:username/following', userController.ifUserExists, userController.sharedProfileData ,userController.profileFollowingScreen);


//Follow related routs
router.post('/addFollow/:username', userController.mustBeLoggedIn ,followController.addFollow );
router.post('/removeFollow/:username', userController.mustBeLoggedIn, followController.removeFollow);



//Exportting the router which I will fetch in the app.js
module.exports = router;