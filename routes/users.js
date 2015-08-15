var Account = require('../models/account'); //for testing purposes
var UserController = require('../controllers/UserController');

module.exports = function(passport, express){
  var router = express.Router();

  //==============
  // GET REQUESTS
  //==============

  // Get the user profile page and its related data
  router.get('/getProfile', function(req, res, next) {
    console.log('Requesting /getProfile for: ' + req.query.userName);
    console.log("sesssion: " + req.session.userName);
    if (UserController.isLoggedIn(req)) {
      var userName = req.query.userName;
      if (userName == 'refSessionID') { //if request is for currently logged in user
        UserController.loadProfile(req, req.session.userName, function(info) { //pass the data to the view
          res.send({
            name: info[0],
            userName: info[1],
            numberOfPosts: info[2],
            numberOfFollowers: info[3],
            profilePic: info[4],
            profileColour: info[5],
            isCurrentUser: info[6],
            currentUserName: info[7],
            numberOfFollowing: info[8],
            profileDescription: info[9]
          });
        });
      } else {
        UserController.loadProfile(req, userName, function(info) { //pass the data to the view
          res.send({
            name: info[0],
            userName: info[1],
            numberOfPosts: info[2],
            numberOfFollowers: info[3],
            profilePic: info[4],
            profileColour: info[5],
            isCurrentUser: info[6],
            currentUserName: info[7],
            numberOfFollowing: info[8],
            profileDescription: info[9]
          });
        });
      }
    } else {
      res.send('Not logged in!');
    }
  });

  router.get('/searchName', function(req, res, next) {
    UserController.elasticSearch(req.query.search, function(response) {
      res.send(response.hits.hits);
    });
  });



  router.get('/test', function(req, res, next) {

  });

  router.get('/test1', function(req, res, next) {
    if(req.user){
      console.log(req.user);
      res.send('You are authenticated! user object:');
    }
    else{
      res.send('you are not authenticated!');
    }

  });



  //==============
  //POST REQUESTS
  //==============
  //test post request
  router.post('/test3', passport.authenticate('local'), function(req, res, next) {
    res.send('Authenticated successfully!');
  });

router.get('/test1', function (req, res, next) {
  res.render('postPage.hjs');
});

router.get('/video', function (req, res, next) {
  res.render('postPage.hjs');
});

  // Request for registering a user.
  router.post('/register', function(req, res, next) {
    console.log('Attempting to register new user.');
    UserController.registerUser(req, function(success) {
      if (success === true) {
        console.log('Succesfully registered. Redirecting to profile.');
        res.send('Success!');
      } else {
        res.send(success);
      }
    });
  });

  // Request to login
  router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.send('Success!');
  });

  router.post('/m/login', function(req, res, next) {
    UserController.login(req, function(succcess, userName) {
      if (succcess) { //if credentials were correct
        console.log('Logged in succesfully on mobile!');
        res.send('Success!');
      } else { //if credentials were incorrect
        console.log("Could not log in on mobile. :(");
        res.send('Incorrect Email or Password.');
      }
    });
  });


  // request to logout the current user
  router.post('/logout', function(req, res, next) {
    console.log('recieved logout request');
    UserController.logout(req, function(success) {
      if (success) {
        console.log('logout succeded! redirecting to frontpage!');
        res.redirect('/');
      } else {
        res.send("you can't leave. video45 is love, video45 is life.");
      }
    });
  });

  router.post('/follow', function(req, res, next) {
    if (UserController.isLoggedIn(req)) {
      //follow that use
      UserController.followUser(req, function(msg, numberOfFollowers) {

        res.send({
          message: msg,
          followers: numberOfFollowers
        }); //send back message, and updated number of followers
      });
    } else {
      res.send('Not logged in!');
    }
  });

  router.post('/updateProfile', function(req, res, next) {
    if (UserController.isLoggedIn(req)) {
      UserController.updateProfile(req, function(msg) {
        console.log("sesssion: " + req.session.userName);
        res.send(msg);
      });
    } else {
      res.send('Not logged in!');
    }
  });

  router.post('/createPost', function(req, res, next) {
    if (UserController.isLoggedIn(req)) {
      UserController.createPost(req, function() {

      });
    } else {
      res.send('Not logged in!');
    }
  });

  return router;

};
