// contains code to deal with database

//Database
var nano = require('nano')('http://localhost:5984');
var video45 = nano.use('video45');



exports.insertNewUser= function(fullName, email, password){
  video45.insert(
    {"fullName": fullName,
     "email": email,
     "password": password
    }, email, function(err, body){

    if(err)
      console.log('Error: ' + err);

  });
}

exports.checkIfUserExists = function(email, password, callback){

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
