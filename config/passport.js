var Account = require('../models/account.js');
module.exports = function(passport, LocalStrategy) {

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      var email = username;
      console.log('Called Authenticate function.');
      console.log('email ' + username);
      console.log('password ' + password);
      //authenticate the user here

      Account.checkCredentials(email, password, function(exists) {
        if (exists) { //if user exists
          console.log('Account exists.');
          Account.getUserName(email, function(userName) { //get the username based on the email provided
            console.log('found the username');
            done(null, userName);
          });
        } else { //else callback with false
          console.log('Account does not exist');
          done(null, false);
        }
      });

    }
  ));

  //determines what gets stored in the session
  passport.serializeUser(function(user, done) {
    console.log('Called serialize. Serializing: ' + user);
    done(null, user); //store username in session
  });

  //retrieves the user info from the database based on info in the session
  //user is stored in req.user variable
  passport.deserializeUser(function(userName, done) {
    //retrieve the user from the database here
    console.log('Called deserialize.');
    var user = {
      userName: userName,
    };
    done(null, user);
  });
  return passport;
};
