var express = require('express');
var UserController = require('../controllers/UserController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('requesting front page!');
  if(UserController.isLoggedIn(req))
    res.redirect('/users/profile');
  else
    res.render('frontPage');

});

router.get('/profilepage', function(req, res, next) {
  console.log('Profile page requested!');
  if(UserController.isLoggedIn(req))
    res.render('profilePage');
  else {
    res.redirect('/');
  }
});



module.exports = router;
