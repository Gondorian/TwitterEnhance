var express = require('express');
var UserController = require('../controllers/UserController');
var router = express.Router();


var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Requesting /');
  if(UserController.isLoggedIn(req)){
    console.log('User is logged in! Redirecting to /' + req.user.userName);
    res.redirect('/' + req.user.userName);
  }
  else{
    console.log('User is not logged in! Rendering loginPage!');
    res.render('loginPage');
  }
});

router.get('/:userName', function(req, res, next){
  console.log('Requesting /username');
  if(UserController.isLoggedIn(req)){
    var userName = req.params.userName;
    UserController.loadProfile(req, userName, function(info){ //pass the data to the view
      res.render('profilePage', {name: info[0], userName: info[1], numberOfPosts: info[2], numberOfFollowers: info[3], profilePic: info[4], profileColour: info[5], isCurrentUser: info[6], currentUserName: info[7], numberOfFollowing: info[8], profileDescription: info[9]});
    });
  }
  else{
    res.redirect('/');  //if not logged in, redirect to home
  }

});

module.exports = router;
