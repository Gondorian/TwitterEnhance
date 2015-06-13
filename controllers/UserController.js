var Account = require('../models/account');

var session;

exports.registerUser = function(req){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.email;

  account.inserNewUser(fullName, email, password);

  return false;
}

exports.login = function(req){        //get the user's session and set the session variable 'email' to the one supplied by the user
  //var email = req.body.email;
  //session = req.session;
  //session.email = email;

  return false;

}

exports.getUserProfile = function(email){

}

function authenticate(email, password){

}

exports.isLoggedIn = function(req){
  session = req.session;
  if(req.session.email){
    return true;
  }
}

exports.logout = function(req){
  req.session.destroy(function(err){
    if(err) return(false);
    else return(true);
  });
}
