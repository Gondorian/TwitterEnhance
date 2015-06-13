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

exports.login = function(req, callback){        //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  var password = req.body.password;

  Account.checkIfUserExists(email, password, function(exists){
      if(exists){         //if user exists, set the session variable to the email from the request
        var session = req.session;
        session.email = req.body.email;
        callback(true);
      }
      else{               //else callback with false
        callback(false);
      }
  });

}

exports.getUserProfile = function(req, callback){
  var session = req.session;
  var email = session.email;
  Account.getProfileName(email, function(name){
    callback(name);
  });

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
