// contains code to deal with database

//Database
var nano = require('nano')('http://localhost:5984');
var video45 = nano.use('video45');

exports.inserNewUser= function(fullName, email, password){
  video45.insert(
    {"fullName": fullName,
     "email": email,
     "password": password
    }, email, function(err, body){

    if(err)
      console.log('Error: ' + err);

  });
}

exports.checkIfUserExists = function(){

}
