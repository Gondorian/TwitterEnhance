var Account = require('../models/account');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '104.131.218.159:9200',
  log: 'trace'
});


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
          callback(true, userName);
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
    Account.getUserProfile(userName, function(data){
      console.log('Loading profile: ' + req.session.userName);
      var info = [data.fullName, data.userName, data.numberOfPosts, data.numberOfFollowers, data.profilePic, data.profileColour, 'false', req.session.userName, data.numberOfFollowing, data.profileDescription];
      callback(info);
    });
  }
}

exports.followUser = function(req, callback){
  var followUser = req.body.userName;
  if (followUser == req.session.userName){    //if the user is trying to follow himself
    callback('bruh. you are trying to follow urself', null);
  }
  else{
    Account.followUser(req.session.userName, followUser, function(msg, followers){
      console.log(msg);
      callback(msg, followers);
    });
  }
}

exports.updateProfile = function(req, callback){
  var description = req.body.description;
  var profilePic = req.body.picURL;
  var fullName = req.body.profileName;
  var userName = req.session.userName;
  var profileColour = req.body.colour;
  Account.updateProfile(userName, description, profilePic, fullName, profileColour, function(message){
    callback(message);
  });

}

exports.createPost = function(req, callback){
  var postDescription = req.body.description;
}

exports.searchName = function(req, callback){
  var name = req.query.name;  //search term taken from request
  console.log('Search term in searchName: ' + name);
  Account.searchName(name, function(data){
    callback(data);
  });
}

exports.elasticSearch = function(searchTerm, callback){
  client.search({
    index: 'video45',
    body: {
      query: {
        wildcard: {
          userName: '*'+searchTerm+'*'
        }
      }
    }
    }, function (error, response) {
      if(!error){
        console.log ('Response from the elastic search: ');
        console.log(response);
        callback(response);
      }else{
        console.log('Elastic search threw an error: ' + error);
        callback('Could not complete search!');
      }
  });
}
