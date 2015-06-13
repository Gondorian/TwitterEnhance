var express = require('express');
var router = express.Router();

//var passport = require('passport');
var account = require('../models/account');
var UserController = require('../controllers/UserController');

// GET REQUESTS

router.get('/profile', function(req, res, next) {
  res.render('mainPage');
});

router.get('/profileName', function(req, res, next){
  UserController.getUserProfile(req);

});

router.get('/logout', function(req, res, next){
  var success = UserController.logout(req);
  if(success)
    res.redirect('/');
  else
    res.send("you can't leave. video45 is love, video45 is life.")
});


//POST REQUESTS

// Request for registering a user.
router.post('/register', function(req, res, next){
  var success = UserController.registerUser(req);

  if(success)
    res.redirect('/profile');
  else
    res.redirect('/');
});

router.post('/login', function(req, res, next){

  var success = UserController.login(req);
  if (success)
    res.redirect('/profile');
  else
    res.redirect('/');

});





module.exports = router;
