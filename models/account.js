// contains code to deal with database

//Database

var nano = require('nano')('http://localhost:5984');
var video45 = nano.use('video45');



exports.insertNewUser = function(fullName, email, userName, password, callback) {
  video45.insert({
    "type": "user",
    "fullName": fullName,
    "email": email,
    "userName": userName,
    "password": password,
    "numberOfPosts": 0,
    "numberOfFollowers": 0,
    "numberOfFollowing": 0,
    "profilePic": "design/no-profile-img.gif",
    "profileColour": "rgb(255,0,0)",
    "profileDescription": "Welcome to my profile! Please follow me. I have stage 3 cancer and the doctor said if I get 10k followers he can do the operation. 1 follow = 1 prayer."
  }, function(err, body) {
    if (err) {
      console.log('Error: ' + err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.insertFacebookUser = function(fullName, email, userName, facebookID, callback){
  video45.insert({
    "type": "user",
    "fullName": fullName,
    "email": email,
    "userName": userName,
    "facebookID": facebookID,
    "numberOfPosts": 0,
    "numberOfFollowers": 0,
    "numberOfFollowing": 0,
    "profilePic": "design/no-profile-img.gif",
    "profileColour": "rgb(255,0,0)",
    "profileDescription": "Hey! Welcome to my profile!"
  }, function(err, body) {
    if (err) {
      console.log('Error in insertFacebookUser: ' + err);
      callback(false);
    } else {
      callback(true);
    }
  });
}

exports.insertNewPost = function(title, description, vidURL, userName, date, callback) {
  video45.insert({
    "type": "post",
    "title": title,
    "description": description,
    "vidURL": vidURL,
    "user": userName,
    "numberOfLikes": 0,
    "numberOfComments": 0,
    "numberOfShares": 0,
    "date": date
  }, function(err, body) {
    if (err) {
      console.log('Error in insertFacebookUser: ' + err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

//check if credentials match to ones in database (when loggin in)
exports.checkCredentials = function(email, password, callback) {
  console.log('Called checkCredentials.');
  video45.view('user', 'credentials', {
    keys: [email]
  }, function(err, body) { //key = email, value = password
    var found = false;
    if (!err) {
      body.rows.forEach(function(doc) { //for each row in the view check for the email and username
        if (doc.key == email && doc.value == password) {
          found = true;
        }
      });
    } else {
      console.log('Check Credentials returned no rows! Error: ' + err);
      callback(false);
    }


    if (found === true) //if the email and password matched, return true
      callback(true);
    else {
      callback(false); //else return false
    }

  });
};

//check if user is in database (used when registering to prevent duplicate)
exports.checkIfUserExists = function(email, userName, callback) { //returns the userNames view (key = email, value = username)
  video45.view('user', 'userNames', function(err, body) {
    var found = "";
    if (!err) {
      body.rows.forEach(function(doc) { //for each row in the view check for the email and username
        if (doc.key == email) {
          found = 'Email already exists! ';
        }
        if (doc.value == userName) {
          found = found + 'Username is taken!';
        }
      });
    }

    if (found === "") //if email or username wasnt found, callback false
      callback(false);
    else {
      callback(found); //else return the error
    }
  });

};

//get the username of a user based on the email (used when loggin in)
exports.getUserName = function(email, callback) {
  video45.view('user', 'userNames', {
    keys: [email]
  }, function(err, body) { //key = email, value = username
    if (!err) {
      body.rows.forEach(function(doc) { //for each row in the view check for the email
        if (doc.key == email) {
          callback(doc.value); //if email is found, return the associated username
        }
      });
    } else {
      callback(false); //return false to show that no such user was found
      console.log('Database query in getUserName returned no rows.');
    }
  });
};

// get the details of a particular user
exports.getUserProfile = function(userName, callback) {
  video45.view('user', 'by_id', {
    keys: [userName]
  }, function(err, body) { //key = userName, value = _id
    if (!err) {
      body.rows.forEach(function(doc) { //for each row in the view check for the userName
        if (doc.key == userName) {
          var docID = doc.value; //if username is found, get the doc id

          video45.get(docID, function(err, body) {
            if (!err) {
              console.log('FOUND THE BODY');
              callback(body);
            } else {
              console.log(err);
            }
          });
        }
      });
    } else {
      console.log('Database query in getUserProfile returned no rows.');
    }
  });
};

exports.findFacebookUser = function(facebookID, callback) {
  console.log('Finding facebook user.');
  video45.view('user', 'facebook_id', {
    keys: [facebookID]
  }, function(err, body) { //key = facebookID, value = userName
    console.log('Reply from database. facebook_id');
    if (!err) {
      body.rows.forEach(function(doc) { //for each row in the view check for the userName
        if (doc.key == facebookID) {
          callback(doc.value);
        }
      });

    } else { // no results (i.e user doesn't exist)
      callback(null);
    }
  });
};

exports.followUser = function(currentUser, followUser, callback) {
  video45.view('user', 'by_id', function(err, body) { //key = useName, value = _id
    var currentID; //doc id for currentUser
    var followID; //doc id for followUser
    if (!err) {
      body.rows.forEach(function(doc) { //find the docID for the currentUser and followUser
        if (doc.key == currentUser) {
          currentID = doc.value;
        } else if (doc.key == followUser) {
          followID = doc.value;
        }
      });
    }

    if (currentID !== null && followID !== null) { //If the docs for Current User and Follow User were found
      //call follow_user update function in db
      video45.atomic('user', 'follow_user', currentID, {
        user: followUser
      }, function(error, response) {
        if (!error) {
          console.log('Response from follow_user: ' + response);

          // check to see that the user is not already followed
          if (response != 'User already followed!') {

            // if not followed(i.e the followUser was added to the list of following), update the followUser's numberOfFollowers
            video45.atomic('user', 'update_numberOfFollowers', followID, null, function(err, res) {
              console.log("update_numberOfFollowers executed!");
              if (!err) { // if the followUser's number of followers was updated
                console.log('Response from update_numberOfFollowers: ' + res);
                callback('Added to following!', res);
              } else { // numberOfFollowers not updated
                console.log('Error from update_numberOfFollowers: ' + err);
                callback('Could not update numberOfFollowers!', null);
              }
            });
          } else { //user already being followed
            console.log('User already being followed!');
            callback('User is already being followed!');
          }
        } else { //could not add followUser to list of following
          console.log('Error from follow_user: ' + error);
          callback('Could not add followUser to currentUsers list of following.');
        }
      });
    } else { //docID's were not found
      console.log("The docID's were not found!");
      callback('currentUser or followUser was not found.');
    }

  });
};


exports.updateProfile = function(userName, description, profilePic, fullName, profileColour, callback) {
  console.log('The profile info: ' + userName + ' description: ' + description + ' fullName: ' + fullName + ' profilePic: ' + profilePic + ' profileColour: ' + profileColour);
  video45.view('user', 'by_id', function(err, body) {
    var docID;
    if (!err) {
      body.rows.forEach(function(doc) { //find the docID for the user whose profile is being updated
        if (doc.key == userName) {
          docID = doc.value;
        }
      });
    }

    if (docID !== null) { //if the doc is found
      video45.atomic('user', 'update_profile', docID, {
        desc: description,
        name: fullName,
        pic: profilePic,
        colour: profileColour
      }, function(err, res) {
        if (!err) {
          console.log('Response from update_profile: ' + res);
          callback('Success!');
        } else {
          console.log('Error from update_profile: ' + err);
          callback('fail!');
        }
      });
    }
  });
};



exports.searchName = function(searchTerm, callback) {
  video45.view('user', 'search', function(err, body) {
    if (!err) {
      var items = [];

      body.rows.forEach(function(doc) {
        console.log('Found a similar user!');
        if (doc.key.indexOf(searchTerm) > -1) { // if userName contains search term
          items.push({
            userName: doc.key,
            profilePic: doc.value
          });
        }
      });
      console.log('Items after going through view: ' + items);
      callback(items);
    } else {
      console.log('The error from the search view function: ' + err);
    }

  });
};
