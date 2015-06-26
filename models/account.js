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
     "numberOfFollowing": 0,
     "profilePic": "default",
     "profileColour": "red",
     "profileDescription": "Welcome to my profile! Please follow me. I have stage 3 cancer and the doctor said if I get 10k followers he can do the operation. 1 follow = 1 prayer."
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

exports.followUser = function(currentUser, followUser, callback){
  video45.view('user', 'by_id', function(err, body){  //key = useName, value = _id
    var currentID;    //doc id for currentUser
    var followID;     //doc id for followUser

    body.rows.forEach(function(doc) {         //find the docID for the currentUser and followUser
      if(doc.key == currentUser){
        currentID = doc.value;
      }
      else if (doc.key == followUser) {
        followID = doc.value;
      }
    });


    if (currentID != null && followID != null){     //If the docs for Current User and Follow User were found
      //call follow_user update function in db
      video45.atomic('user', 'follow_user', currentID, {user: followUser}, function(error, response){
        if(!error){
          console.log('Response from follow_user: ' + response);

          // check to see that the user is not already followed
          if(response != 'User already followed!'){

            // if not followed(i.e the followUser was added to the list of following), update the followUser's numberOfFollowers
            video45.atomic('user', 'update_numberOfFollowers', followID, null, function(err, res){
              console.log("update_numberOfFollowers executed!");
              if(!err){ // if the followUser's number of followers was updated
                console.log('Response from update_numberOfFollowers: ' + res);
                callback('Added to following!', res);
              }
              else{ // numberOfFollowers not updated
                console.log('Error from update_numberOfFollowers: ' + err);
                callback('Could not update numberOfFollowers!', null);
              }
            });
          }
          else{ //user already being followed
            console.log('User already being followed!');
            callback('User is already being followed!');
          }
        }
        else{   //could not add followUser to list of following
          console.log('Error from follow_user: ' + error);
          callback('Could not add followUser to currentUsers list of following.');
        }
      });
    }
    else{ //docID's were not found
      console.log("The docID's were not found!");
      callback('currentUser or followUser was not found.');
    }

  });
}

exports.updateProfile = function(userName, description, profilePic, fullName, callback){
  console.log('The profile info: ' + userName + ' description: ' + description + ' fullName' + fullName + ' profilePic: ' + profilePic );
   video45.view('user', 'by_id', function(err, body){
     var docID;
     body.rows.forEach(function(doc) {         //find the docID for the user whose profile is being updated
       if(doc.key == userName){
         docID = doc.value;
       }
     });

     if(docID != null){                       //if the doc is found

       video45.atomic('user', 'update_profile', docID, {desc: description, name: fullName, pic: profilePic}, function(err, res){
         if(!err){
           console.log('Response from update_profile: ' + res);
           callback('Success!');
         }
         else{
           console.log('Error from update_profile: ' + err);
           callback('fail!');
         }
       });
     }

   });
}
