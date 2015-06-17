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

//check if credentials match to ones in database
exports.checkCredentials = function(email, password, callback){

  video45.get(email,                //retrieves the document with id
    function(err, body) {
      if (!err){                   //if doc exists, checks password and calls the callback
        pass = body['password'];
        if(pass == password)
          callback(true);
        else
          callback(false);
      }
      else {                      //if doc doesnt exist, calls the callback with false
        callback(false);
      }

    });
}

//check if user is in database
exports.checkIfUserExists = function(email, userName, callback){  //returns the userNames view (key = email, value = username)
  video45.view('user', 'userNames', function(err, body){
    var found = false;
    body.rows.forEach(function(doc) {
      if(doc.key == email){
        found = 'Email already exists';
      }
      else if (doc.value == userName) {
        found = 'Username is taken!';
      }
    });
    if(found == false)    //if email or username wasnt found, callback false
      callback(false);
    else {
      callback(found);  //else return the err
    }
  });

}

exports.getProfileName = function(email, callback){
  console.log('email for profilename request 2: ' + email);
  video45.get(email,
    function(err, body) {
      if (!err){
        console.log(body);
        var returnName = body['fullName'];
        console.log('the name that was in the body: ' + returnName);
        callback(returnName);
      }

    });

}
