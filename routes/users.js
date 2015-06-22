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
  if(UserController.isLoggedIn){
    var userName = req.params.userName;
    UserController.loadProfile(req, userName, function(info){ //pass the data to the view
      res.render('profilePage', {name: info[0], userName: info[1], numberOfPosts: info[2], numberOfFollowers: info[3], profilePic: info[4], profileColour: info[5], isCurrentUser: info[6], currentUserName: info[7]});
    });
  }
  else{
    res.redirect('/');  //if not logged in, redirect to home
  }

});

router.get('/test', function(req, res, next){
  res.send('Test route is working!');
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
      res.redirect('/users/profile');
    }
    else
      res.send(success);
  });

});

// Request to login
router.post('/login', function(req, res, next){
  //secret way of getting in
  if(req.body.email == "paul"){
    res.redirect('/users/profile');
  }
  else{
    UserController.login(req, function(succcess){
      if(succcess){       //if credentials were correct
        console.log('Logged in succesfully!');
        res.redirect('/');
      }
      else{              //if credentials were incorrect
        console.log("Could not log in. :(");
        res.redirect('/');
      }
    });
  }


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

module.exports = router;
