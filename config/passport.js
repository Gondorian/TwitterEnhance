//var ip = "104.131.218.159";
var ip = 'localhost:3000';
var Account = require('../models/account.js');
var UserController = require('../controllers/UserController.js');
module.exports = function(passport, LocalStrategy, FacebookStrategy, TwitterStrategy) {

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      var email = username;
      console.log('Called Authenticate function.');
      //authenticate the user here

      Account.checkCredentials(email, password, function(exists) {
        if (exists) { //if user exists
          console.log('Account exists.');
          Account.getUserName(email, function(userName) { //get the username based on the email provided
            console.log('found the username');
            var user = {
              userName: userName
            };
            done(null, user);
          });
        } else { //else callback with false
          console.log('Account does not exist');
          done(null, false);
        }
      });

    }
  ));

  passport.use(new FacebookStrategy({
      clientID: '1674138302874457',
      clientSecret: '72ba3c0d8008aab4beade37d0c557bb6',
      callbackURL: "http://" + ip + "/users/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      //look for the user to see if this is a returning user and load his profile if so
      console.log('Called facebook authenticate.');
      Account.findFacebookUser(profile.id, function(userName) {
        if (userName === null) { //if no user found (first time user)
          console.log('This is a new facebook user!');
          //store the available user info, the rest of the info will be taken from redirected page
          var user = {
            userName: null,
            facebookID: profile.id,
            name: profile.displayName,
            email: null
          };
          done(null, user);

        } else { //user is found
          console.log('This is a returning facebook user!');
          var user = {
            userName: userName
          };
          done(null, user);
        }
      });
    }
  ));


  //determines what gets stored in the session
  passport.serializeUser(function(user, done) {
    console.log('Called serialize. Serializing: ' + user);
    done(null, user); //store user supplied in to the session
  });

  //retrieves the user info from the database based on info in the session
  //user is stored in req.user variable
  passport.deserializeUser(function(user, done) {
    console.log('Called deserialize.');
    done(null, user);
  });

  return passport;
};
