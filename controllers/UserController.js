var Account = require('../models/account');

var session;

exports.registerUser = function(req, callback){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;

  Account.checkIfUserExists(email, function(exists){
      if(exists){         //if user exists, callback false (no success)
        callback(false);
      }
      else{               //else insert the user, set the session and callback with true
        //var fullName = req.body.fullName;
        //var email = req.body.email;
        //var password = req.body.password;

        Account.insertNewUser(fullName, email, password);
        req.session.email = email;
        callback(true);
      }
  });



  console.log('it has got here!');
  return true;
}

exports.login = function(req, callback){        //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  var password = req.body.password;

  Account.checkCredentials(email, password, function(exists){
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
  session = req.session;
  var email = session.email;
  console.log('email for profilename request: ' + email);
  Account.getProfileName(email, function(name){
    callback(name);
  });

}

exports.isLoggedIn = function(req){
  session = req.session;
  if(session.email){
    console.log('The Session email: ' + session.email);
    return true;
  }
  else {
    console.log('No Session email found!');
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
