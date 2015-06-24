var express = require('express');
var router = express.Router();

//var passport = require('passport');
var account = require('../models/account');
var UserController = require('../controllers/UserController');



//==============
// GET REQUESTS
//==============

// Get the user profile page and its related data
router.get('/:userName', function(req, res, next){
  console.log('URL Parameter: ' + req.params.userName);
  if(UserController.isLoggedIn(req)){
    var userName = req.params.userName;
    UserController.loadProfile(req, userName, function(info){ //pass the data to the view
      console.log('Number of Following ' + info[8]);

      res.render('profilePage', {name: info[0], userName: info[1], numberOfPosts: info[2], numberOfFollowers: info[3], numberOfFollowing: info[4], profilePic: info[4], profileColour: info[5], isCurrentUser: info[6], currentUserName: info[7], numberOfFollowing: info[8]});
    });
  }
  else{
    res.redirect('/');  //if not logged in, redirect to home
  }

});


//==============
//POST REQUESTS
//==============

// Request for registering a user.
router.post('/register', function(req, res, next){
  console.log('Attempting to register new user.');
  UserController.registerUser(req, function(success){
    if(success == true){
      console.log('Succesfully registered. Redirecting to profile.');
      res.redirect('/');
    }
    else
      res.send(success);
  });

});

// Request to login
router.post('/login', function(req, res, next){

  UserController.login(req, function(succcess){
    if(succcess){       //if credentials were correct
      console.log('Logged in succesfully!');
      res.redirect('/');
    }
    else{              //if credentials were incorrect
      console.log("Could not log in. :(");
      res.send('Incorrect Email or Password.');
    }
  });



});


// request to logout the current user
router.post('/logout', function(req, res, next){
  console.log('recieved logout request');
  UserController.logout(req, function(success){
    if(success){
      console.log('logout succeded! redirecting to frontpage!');
      res.redirect('/');
    }
    else{
      res.send("you can't leave. video45 is love, video45 is life.");
    }
  });
});

router.post('/follow', function(req, res, next){
  if(UserController.isLoggedIn(req)){
    //follow that use
    UserController.followUser(req, function(msg){
      res.send(msg);
    });
  }
  else{
    res.redirect('/');
  }

});

module.exports = router;
