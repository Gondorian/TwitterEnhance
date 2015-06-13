var express = require('express');
var UserController = require('../controllers/UserController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(UserController.isLoggedIn)
    res.redirect('/users/profile');
  else
    res.render('index');

});



module.exports = router;
