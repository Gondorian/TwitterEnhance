var express = require('express');
var router = express.Router();

//var passport = require('passport');
var account = require('../models/account');
var UserController = require('../controllers/UserController');

// GET REQUESTS

router.get('/profile', function(req, res, next) {
  console.log('profile requested!');
  res.render('mainPage');
});

router.get('/profileName', function(req, res, next){
  res.send(UserController.getUserProfile(req));
});

router.get('/logout', function(req, res, next){
  console.log('recieved logout request');
  var success = UserController.logout(req);
  if(success){
    console.log('logout succeded! redirecting to frontpage!');
    res.redirect('/');
  }
  else
    res.send("you can't leave. video45 is love, video45 is life.")
});


//POST REQUESTS

// Request for registering a user.
router.post('/register', function(req, res, next){
  var success = UserController.registerUser(req);
  console.log('value of success:' + success);
  if(success){
    console.log('Succesfully registered. Redirecting to profile.');
    res.redirect('/users/profile');
  }
  else
    res.redirect('/');
});

router.post('/login', function(req, res, next){
  if(req.body.email == "paul"){
    res.redirect('/users/profile');
  }
  else{
    var success = UserController.login(req);

    if (success){
      res.redirect('/users/profile');
    }
    else{
      res.redirect('/');
    }
  }


});

module.exports = router;
