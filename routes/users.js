var express = require('express');
var router = express.Router();

var passport = require('passport');
var account = require('../models/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Request for registering a user.
router.post('/register1', function(req, res, next){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;

  res.send('I have recieved your name: ' + fullName + ', email: ' + email + ', password: ' + password);

});

router.post('/register', function(req, res, next){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;
  account.inserNewUser(fullName, email, password);

  res.render('Success!');

});

router.get('/welcome', function(req, res, next) {
  res.render('mainPage');
});

module.exports = router;
