var Account = require('../models/account'); //for testing purposes
var UserController = require('../controllers/UserController');

module.exports = function(passport, express) {
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

  //directs user to facebook for authentication
  router.get('/auth/facebook', passport.authenticate('facebook'));

  //facebook redirects user to here after user authorizes fb
  router.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res, next) {
    res.send(req.user.profileID);
  });

  router.get('/error', function(req, res, next) {
    res.send('There was an internal error. Please try again later.');
  });

  router.get('/test', function(req, res, next) {
    res.render('facebookRegister.hjs');
  });

  router.get('/test1', function(req, res, next) {
    if (req.user) {
      console.log(req.user);
      res.send('You are authenticated! user object:');
    } else {
      res.send('you are not authenticated!');
    }
  });

  router.get('/video', function(req, res, next) {
    res.render('postPage.hjs');
  });

  router.get('/loadVideos', function(req, res, next) {
    if (UserController.isLoggedIn(req)) {
      if (req.query.userName === 'refSessionID') { //if request is for current user
        UserController.getUserVideos(req.user.userName, function(success, data) {
          if(success){
            res.send({'videos': data});
          }else {
            res.send('Error!');
          }
        });
      } else {
        UserController.getUserVideos(req.query.userName, function(success, data) {
          if(success){
            res.send({'videos': data});
          }else {
            res.send('Error!');
          }
        });
      }
    } else {
      res.send('Authentication Error. Make sure you are logged in.');
    }
  });



  //==============
  //POST REQUESTS
  //==============
  //test post request
  router.post('/test3', function(req, res, next) {
    UserController.saveRecording(req, res);
  });



  router.get('/feed', function(req, res, next) {
    res.render('mainPage.hjs');
  });

  // Request for registering a user.
  router.post('/register', function(req, res, next) {
    console.log('Attempting to register new user.');
    var fullName = req.body.fullName;
    var email = req.body.email;
    var userName = req.body.username;
    var password = req.body.password;
    UserController.registerUser(fullName, email, userName, password, req, function(success) {
      if (success === true) {
        console.log('Succesfully registered. Redirecting to profile.');
        res.send('Success!');
      } else {
        res.send(success);
      }
    });
  });

  router.post('/registerFacebook', function(req, res, next) {
    var userName = req.body.userName;
    var email = req.body.email;
    UserController.registerFacebookUser(userName, email, req.user.profileID, function(success, err) {
      if (success) {

      } else {
        if (err === '500') {
          res.redirect('/users/error');
        } else {
          res.send(err);
        }

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
    req.logout();
    res.redirect('/');
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
      UserController.createPost(req, function(success) {
        if (success) {
          res.send('Success!');
        } else {
          res.send('Unable to create the video. Please try again later.');
        }
      });
    } else {
      res.send('Not logged in!');
    }
  });

  router.post('/comment', function(req, res, next){
    if(UserController.isLoggedIn(req)){
      UserController.addComment(req, function(success){
        if (success) {
          res.send('Success!');
        } else{
          res.send('Fail!');
        }
      });
    }
  });
  return router;

};
