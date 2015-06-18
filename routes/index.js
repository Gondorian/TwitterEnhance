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


module.exports = router;
