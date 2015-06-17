var express = require('express');
var UserController = require('../controllers/UserController');
var router = express.Router();


var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('requesting front page!');
  if(UserController.isLoggedIn(req))
    res.redirect('/users/profile');
  else
    res.render('loginPage');
});


router.get('/profilepage', function (req, res, next) {
  res.render('profilePage');
});

router.get('/test', function (req, res, next) {
  UserController.loadProfile(req, 'paul.azevedo', function(info){
    res.render('test', {name: info[0], userName: info[1], numberOfPosts: info[2], numberOfFollowers: info[3], profilePic: info[4], profileColour: info[5], isCurrentUser: info[6]});
  });
});

module.exports = router;
