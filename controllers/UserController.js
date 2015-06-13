var Account = require('../models/account');

var session;

exports.registerUser = function(req){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.email;

  Account.insertNewUser(fullName, email, password);
  console.log('it has got here!');
  return true;
}

exports.login = function(req){        //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  session = req.session;
  session.email = email;

  return true;

}

exports.getUserProfile = function(req){
  Account.getProfileName('paul@gmail.com');

}

function authenticate(email, password){

}

exports.isLoggedIn = function(req){
  session = req.session;
  if(session.email){
    console.log('email: ' + session.email);
    return true;
  }
  else {
    console.log('No email found!');
    false;
  }
}

exports.logout = function(req){
  return req.session.destroy(function(err){
    if(err){
      console.log(err);
      return false;
    }
    else
      return true;
  });


}
