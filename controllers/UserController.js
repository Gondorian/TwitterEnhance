var Account = require('../models/account');


exports.login = function(req, callback){        //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  var password = req.body.password;

  Account.checkCredentials(email, password, function(exists){
      if(exists){         //if user exists, set the session variable to username of the user
        var session = req.session;
        Account.getUserName(email, function(userName){    //get the username based on the email provided
          session.userName = userName;
          callback(true);
        });
      }
      else{               //else callback with false
        callback(false);
      }
  });
}

exports.logout = function(req, callback){             //destroys the session. if there is an error, returns false, else true
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      callback(false);
    }
    else
      callback(true);
  });


}

exports.isLoggedIn = function(req){     //checks if logged in by seeing if the session.userName variable is set
  var session = req.session;
  if(session.userName){
    console.log('Logged in username is: ' + session.userName);
    return true;
  }
  else {
    console.log('Not logged in! (no session username)');
    false;
  }
}

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
      else{               //else callback with the error
        callback(exists);
      }
  });
}


exports.login = function(req, callback){        //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  var password = req.body.password;

  Account.checkCredentials(email, password, function(exists){
    console.log(email);
      if(exists){         //if user exists, set the session variable to username of the user
        var session = req.session;
        Account.getUserName(email, function(userName){    //get the username based on the email provided
          session.userName = userName;
          callback(true);
        });
      }
      else{               //else callback with false
        callback(false);
      }
  });
}

exports.loadProfile = function(req, userName, callback){
  if(req.session.userName == userName){     //if request is for currently logged in user
    Account.getUserProfile(userName, function(data){
        console.log('Loading profile: ' + req.session.userName);
        var info = [data.fullName, data.userName, data.numberOfPosts, data.numberOfFollowers, data.profilePic, data.profileColour, 'true', req.session.userName, data.numberOfFollowing, data.profileDescription];
        callback(info);
    });
  }
  else{                                     //if request is for some other user's profile
    Account.getUserProfile(userName, function(data){//check if user is in database
exports.checkIfUserExists = function(email, userName, callback){  //returns the userNames view (key = email, value = username)
  video45.view('user', 'userNames', function(err, body){
    var found = "";
    body.rows.forEach(function(doc) {         //for each row in the view check for the email and username
      if(doc.key == email){
        found = 'Email already exists! ';
      }
      if (doc.value == userName) {
        found = found + 'Username is taken!';
      }
    });
    if(found == "")    //if email or username wasnt found, callback false
      callback(false);
    else {
      callback(found);  //else return the err
    }
  });
}
      console.log('Loading profile: ' + req.session.userName);
      var info = [data.fullName, data.userName, data.numberOfPosts, data.numberOfFollowers, data.profilePic, data.profileColour, 'false', req.session.userName, data.numberOfFollowing, data.profileDescription];
      callback(info);
    });
  }
}//check if user is in database
exports.checkIfUserExists = function(email, userName, callback){  //returns the userNames view (key = email, value = username)
  video45.view('user', 'userNames', function(err, body){
    var found = "";
    body.rows.forEach(function(doc) {         //for each row in the view check for the email and username
      if(doc.key == email){
        found = 'Email already exists! ';
      }
      if (doc.value == userName) {
        found = found + 'Username is taken!';
      }
    });
    if(found == "")    //if email or username wasnt found, callback false
      callback(false);
    else {
      callback(found);  //else return the err
    }
  });
}


exports.followUser = function(req, callback){
  var followUser = req.body.userName;
  if (followUser == req.session.userName){    //if the user is trying to follow himself
    callback('bruh. you are trying to follow urself', null);
  }
  else{
    Account.followUser(req.session.userName, followUser, function(msg, followers){
      callback(msg, followers);
    });
  }
}

exports.updateProfile = function(req, callback){
  var description = req.body.description;
  var profilePic = req.body.profilePic;
  var name = req.body.fullName;

  Account.updateProfile(description, profilePic, name, function(message){
    callback(message);
  });

}
