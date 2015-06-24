// contains code to deal with database

//Database
var nano = require('nano')('http://localhost:5984');
var video45 = nano.use('video45');



exports.insertNewUser= function(fullName, email, userName, password){
  video45.insert(
    {"type": "user",
     "fullName": fullName,
     "email": email,
     "userName": userName,
     "password": password,
     "numberOfPosts": 0,
     "numberOfFollowers": 0,
     "profilePic": "default",
     "profileColour": "red"
    }, function(err, body){
    if(err)
      console.log('Error: ' + err);

  });
}

//check if credentials match to ones in database (when loggin in)
exports.checkCredentials = function(email, password, callback){
  video45.view('user', 'credentials', function(err, body){          //key = email, value = password
    var found = false;
    body.rows.forEach(function(doc) {         //for each row in the view check for the email and username
      if(doc.key == email && doc.value == password){
        found = true;
      }
    });

    if(found == true)    //if the email and password matched, return true
      callback(true);
    else {
      callback(false);  //else return false
    }

  });
}

//check if user is in database (used when registering to prevent duplicate)
exports.checkIfUserExists = function(email, userName, callback){  //returns the userNames view (key = email, value = username)
  video45.view('user', 'userNames', function(err, body){
    var found = "";
    body.rows.forEach(function(doc) {         //for each row in the view check for the email and username
      if(doc.key == email){
        found = 'Email already exists!';
      }
      if (doc.value == userName) {
        found = found + ' Username is taken!';
      }
    });
    if(found == "")    //if email or username wasnt found, callback false
      callback(false);
    else {
      callback(found);  //else return the error
    }
  });

}

//get the username of a user based on the email (used when loggin in)
exports.getUserName = function(email, callback){
  video45.view('user', 'userNames', function(err, body){  //key = email, value = username
    body.rows.forEach(function(doc) {         //for each row in the view check for the email
      if(doc.key == email){
        console.log('Found the email! Associated username is: ' + doc.value);
        callback(doc.value);                     //if email is found, return the associated username
      }
    });
  });
}

// get the details of a particular user
exports.getUserProfile = function(userName, callback){

  video45.view('user', 'by_id', function(err, body){  //key = email, value = _id
    body.rows.forEach(function(doc) {         //for each row in the view check for the userName
      if(doc.key == userName){
        var docID = doc.value;                 //if username is found, get the doc id

        video45.get(docID, function(err, body){
          if(!err){
            console.log('FOUND THE BODY');
            callback(body);
          }
          else {
            console.log(err);
          }
        });

      }
    });
  });
}

exports.followUser = function(currentUser, followUser){
  video45.view('user', 'by_id', function(err, body){  //key = useName, value = _id
    body.rows.forEach(function(doc) {         //for each row in the view check for the userName
      if(doc.key == currentUser){
        var docID = doc.value;                 //if username is found, get the doc id
        console.log('followUser ' + followUser);
        video45.atomic('user', 'follow_user', docID, {user: followUser}, function(error, response){
          if(!error){
            console.log('The response from the update: ' + response);
          }
          else{
            console.log('The error from the update: ' + error);
          }

        });

      }
    });
  });
}
