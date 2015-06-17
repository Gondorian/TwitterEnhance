var Account = require('../models/account');



exports.registerUser = function(req, callback){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var userName = req.body.username;
  var password = req.body.password;

  Account.checkIfUserExists(email, userName, function(exists){
      if(exists == false){         //if user doesn't already exists, insert new user
        Account.insertNewUser(fullName, email, userName, password);
        req.session.userName = userName;
        callback(true);
      }
      else{               //else insert the user, set the session and callback with true
        callback(exists);
      }
  });
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

exports.loadUserProfile = function(req){
  //check if the id is of the user that is logged in.
  var id = req.params.id;

}

exports.getUserProfile = function(req, callback){
  var session = req.session;
  var email = session.email;          //get the session email
  console.log('email for profilename request: ' + email);
  Account.getProfileName(email, function(name){
    callback(name);
  });

}

exports.isLoggedIn = function(req){     //checks if logged in by seeing if the session.userName variable is set
  var session = req.session;
  if(session.userName){
    console.log('The Session username: ' + session.userName);
    return true;
  }
  else {
    console.log('No Session username found!');
    false;
  }
}

exports.logout = function(req){             //destroys the session. if there is an error, returns false, else true
  return req.session.destroy(function(err){
    if(err){
      console.log(err);
      return false;
    }
    else
      return true;
  });


}
