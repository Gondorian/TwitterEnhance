var Account = require('../models/account');
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var client = new elasticsearch.Client({
  host: '104.131.218.159:9200',
  log: 'trace'
});


exports.login = function(req, callback) { //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  var password = req.body.password;

  Account.checkCredentials(email, password, function(exists) {
    if (exists) { //if user exists, set the session variable to username of the user
      var session = req.user;
      Account.getUserName(email, function(userName) { //get the username based on the email provided
        session.userName = userName;
        callback(true);
      });
    } else { //else callback with false
      callback(false);
    }
  });
};

exports.isLoggedIn = function(req) { //checks if logged in by seeing if the session.userName variable is set
  if (req.user) {
    console.log('Logged in username is: ' + req.user.userName);
    return true;
  } else {
    console.log('Not logged in! (no session username)');
    return false;
  }
};

exports.registerUser = function(fullName, email, userName, password, req, callback) {
  Account.checkIfUserExists(email, userName, function(exists) {
    if (exists === false) { //if user doesn't already exists, insert new user
      Account.insertNewUser(fullName, email, userName, password, function(result) {
        if (result) {
          req.session.userName = userName;
          callback(true);
        }
      });
    } else { //else callback with the error
      callback(exists);
    }
  });
};

exports.registerFacebookUser = function(userName, email, facebookID, callback) {
  Account.checkIfUserExists(email, userName, function(exists) {
    if (exists === false) { //if user doesn't already exists, insert new user
      Account.insertNewFacebookUser(fullName, email, userName, facebookID, function(success) {
        if (success) {
          callback(true, null); //callback takes (success, err)
        } else {
          callback(false, '500'); //internal error
        }
      });
    } else { //else callback with the error
      callback(false, exists);
    }
  });
};

exports.login = function(req, callback) { //get the user's session and set the session variable 'email' to the one supplied by the user
  var email = req.body.email;
  var password = req.body.password;

  Account.checkCredentials(email, password, function(exists) {
    console.log(email);
    if (exists) { //if user exists, set the session variable to username of the user
      var session = req.session;
      Account.getUserName(email, function(userName) { //get the username based on the email provided
        session.userName = userName;
        callback(true, userName);
      });
    } else { //else callback with false
      callback(false);
    }
  });
};

exports.loadProfile = function(req, userName, callback) {
  if (req.user.userName == userName) { //if request is for currently logged in user
    Account.getUserProfile(userName, function(data) {
      console.log('Loading profile: ' + req.user.userName);
      var info = [data.fullName, data.userName, data.numberOfPosts, data.numberOfFollowers, data.profilePic, data.profileColour, 'true', req.session.userName, data.numberOfFollowing, data.profileDescription];
      callback(info);
    });
  } else { //if request is for some other user's profile
    Account.getUserProfile(userName, function(data) {
      console.log('Loading profile: ' + req.user.userName);
      var info = [data.fullName, data.userName, data.numberOfPosts, data.numberOfFollowers, data.profilePic, data.profileColour, 'false', req.session.userName, data.numberOfFollowing, data.profileDescription];
      callback(info);
    });
  }
};

exports.getUserVideos = function(userName, callback) {
  Account.getUserVideos(username, function(success, videos){
    if(success){
      callback(true, videos);
    } else {
      callback(false, null);
    }
  });
};

exports.followUser = function(req, callback) {
  var followUser = req.body.userName;
  if (followUser == req.user.userName) { //if the user is trying to follow himself
    callback('bruh. you are trying to follow urself', null);
  } else {
    Account.followUser(req.user.userName, followUser, function(msg, followers) {
      console.log(msg);
      callback(msg, followers);
    });
  }
};

exports.updateProfile = function(req, callback) {
  var description = req.body.description;
  var profilePic = req.body.picURL;
  var fullName = req.body.profileName;
  var userName = req.user.userName;
  var profileColour = req.body.colour;
  Account.updateProfile(userName, description, profilePic, fullName, profileColour, function(message) {
    callback(message);
  });

};

exports.createPost = function(req, callback) {
  console.log('Creating post.');
  var postTitle = 'Test Video';
  var postDescription = 'This is a test video.';
  var vidData = req.body.blob;
  Account.insertNewPost(postTitle, postDescription, vidData, req.user.userName, 'Day 0', function(success){
    callback(success);
  });
};

exports.addComment = function(req, callback){
  var comment = req.body.comment;
  var userName = req.user.userName;

};

exports.searchName = function(req, callback) {
  var name = req.query.name; //search term taken from request
  console.log('Search term in searchName: ' + name);
  Account.searchName(name, function(data) {
    callback(data);
  });
};

exports.elasticSearch = function(searchTerm, callback) {
  client.search({
    index: 'video45',
    body: {
      fields: ['userName', 'profilePic'],
      query: {
        wildcard: {
          userName: '*' + searchTerm + '*'
        }
      }
    }
  }, function(error, response) {
    if (!error) {
      console.log('Response from the elastic search: ');
      console.log(response);
      callback(response);
    } else {
      console.log('Elastic search threw an error: ' + error);
      callback('Could not complete search!');
    }
  });
};
