var express = require('express');
var router = express.Router();

//var passport = require('passport');
var account = require('../models/account');
var UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.render('mainPage');
});

router.get('/profileName', function(req, res, next){
  UserController.getUserProfile(req);
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
