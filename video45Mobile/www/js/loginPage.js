//the react container for the navbar elements
var ip = "192.168.0.146";
var Navbar = React.createClass({
  render:function(){
    return(
      <div className="navbar">
        <form className="languageChoice">
        language:
          <select>
            //the options for the dropdown are currently hardcoded
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
        </form>
      </div>
    );
  }
});

//textbox react create
var Textbox =React.createClass({
  render: function(){
    return(
      <div className="text col s12">
        <div className="textField">
          <h2>Welcome to <h1>video45</h1></h2><br />
          <h3> Bring Videos to life in 45 seconds </h3>
        </div>
      </div>
    );
  }
});

//the login box
var LoginBox =React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="loginBox col s12">
          <form id="loginForm" className ="form">
            <div className="row">
              <div className="input-field col s12">
                <input type="text" name="email" id="logEmail" className="validate"/><br/>
                <label htmlFor="logEmail"> Email </label>
              </div>
            </div>
            <div className="row valign-wrapper">
              <div className="input-field col s8">
                <input type="password" id="password" name="password" className="validate"/>
                <label htmlFor="password">Password</label>
              </div>
              <a className="btn waves-effect waves-light" onClick={login}>LogIn</a>
            </div>
            <div className="row">
              <input type="checkbox" value="remember" className="filled-in" name="group" id="remember"/>
              <label htmlFor="remember" id="remLabel">Remember me</label>
              <a href="#">Forgot Password? </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

var RegisterBox = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="registerBox  col s12">
        <form id = "registration" className="form">
        <h3><b>New to Video45?</b> Sign up</h3><hr />
          <div className="row">
            <div className="input-field col s12">
              <input type="text" id="fullName" name="fullName" /><br/>
              <label htmlFor="fullName">Full Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" id="email" name="email"/><br/>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" id="Username" name="username" /><br/>
              <label htmlFor="Username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="password" id="pass" name="password"/><br/>
              <label htmlFor="pass">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <a id="regButton" className="btn waves-effect waves-light" onClick={register}>Sign Up For vdeo45</a>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
});

var ButtonChoice = React.createClass({
  render: function(){
    return(
      <div>
        <div className ="row">
              <Textbox />
        </div>
        <div className ="row options">
          <div className="col s6">
            <a id="logChoice" className="btn waves-effect waves-light blue" onClick={this.props.logClick}>LOGIN</a>
          </div>
          <div className="col s1 offset-s4">
            <a id="regChoice" className="btn waves-effect waves-light yellow" onClick={this.props.regClick}>REGISTER</a>
          </div>
        </div>
      </div>
    );
  }
});

var FrontPage = React.createClass({
  register: function(){
    console.log("creating login page");
    this.setState({page: <RegisterBox />});
  },
  login: function(){
    console.log("creating login page");
    this.setState({page: <LoginBox />});
  },
  getInitialState: function(){
    return({page: <ButtonChoice logClick={this.login} regClick={this.register}/>});
  },
  render: function(){
    return (
      <div className="menus">
        <Navbar />
        <div className="content" id="mainSection">
          {this.state.page}
        </div>
      </div>
    );
  }
});

React.render(
  <FrontPage />,
  document.getElementById('register')
);

/****************
*  AJAX Calls   *
****************/

//below is the ajax post for the login button form
function login(){
    var loginName = $('#logEmail').val();
    $.ajax({
      url: "http://"+ ip +":3000/users/m/login",
      type: 'POST',
      data: $('#loginForm').serialize(),
      success: function(response){
        console.log(response);
        if(response == "Incorrect Email or Password."){
          Materialize.toast(response,10000);
          $('#password').css("border-color","red");
          $('#logEmail').css("border-color","red");
        }else{
          //local storage is used to maintain the userlogin gained from the server
          localStorage.password = $('#password').val()
          sessionStorage.viewedUser = "refSessionID";
          $(document).attr('location').href='profilePage.html'
        }
      },
      error: function(response){
        //alert('not successful ' + {response});
      }
    });
    return false;
};

//below is the ajax post for the register box
function register(){
      $.ajax({
      url: "http://" + ip +":3000/users/register",
      type: 'POST',
      data: $('#registration').serialize(),
      success: function(response){
        Materialize.toast(response,10000);
        if(response.length < 100 && response.length > 30){//if both email and usrename fail
          $('#email').css("border-color","red");
          $('#Username').css("border-color","red");
        }else if(response.substring(0,4) === "Emai"){//if only email is taken
          $('#email').css("border-color","red");
          $('#Username').css("border-color","#9E9E9E");
        }else if(response.substring(0,4) === "User"){//if only user is taken
          $('#email').css("border-color","#9E9E9E");
          $('#Username').css("border-color","red");
        }else{
          $(document).attr('location').href='profilePage.html'; //if everything is fine
        }
      },
      error: function(response){
        alert('not successful ' + {response});
      }
    });
    return false;
};


/*****************
*    JavaScript  *
*****************/

//list of urls that will cycle through on front page
var backs = [
  "url(file:///android_asset/www/design/super-high-resolution-nature-wallpaper.jpg)",
  "url(file:///android_asset/www/design/high-resolution-wallpapers-25.jpg)"
];

var toggleHelp = -1;
var currentBack = 0;
//This controls the front page image change
var imageToggle = function(){
  if(toggleHelp == -1){
    //happens immedietly
    $("#background1").css("background-image",backs[currentBack]);
    Materialize.fadeInImage('#background1');
    setTimeout(function(){
      $("#background2").css("opacity","0");
      $("#background2").css("z-index","-1");
      $("#background1").css("z-index","-2");
      return;
    },1200);
  }else{
    $("#background2").css("background-image",backs[currentBack]);
    Materialize.fadeInImage('#background2');
    setTimeout(function(){
      $("#background1").css("opacity","0");
      $("#background1").css("z-index","-1");
      $("#background2").css("z-index","-2");
      return
    },1200);
  }
  currentBack = ( currentBack + 1 ) % backs.length;

  toggleHelp = toggleHelp*-1;
  setTimeout(function(){
    imageToggle();
  },10000);
}

var resize = function(){
  var width = parseInt($('#wrapper').css('width'));
  var login = $('.loginBox');
  var register = $('.registerBox');
  var text = $('.text');
  if(width<860){
    //smallscreen
    text.removeClass('s6');
    text.addClass('s12');
    login.removeClass('s6');
    login.addClass('s12');
    $('.form').addClass('center');
    $('.textField').addClass('largeScreen');
    $('#frontpage').css('margin-top','50px')
  }else{
    //largeScreen
    text.addClass('s6');
    text.removeClass('s12');
    login.addClass('s6');
    login.removeClass('s12');
    $('.form').removeClass('center');
    $('.textField').removeClass('largeScreen');
    $('#frontpage').css('margin-top','100px')
  }
};

$(document).ready(function(){
  resize();
  imageToggle();
  data = [
    {'email':localStorage.logged, 'password':localStorage.password}
  ];
  console.log(localStorage.logged);
  console.log(localStorage.password);
  $.ajax({
    url: "http://"+ip+":3000/users/test",
      type: 'GET',
      success: function(response){
        console.log(response);
        if(response == 'Logged in!'){
          console.log('redirecting')
          sessionStorage.viewedUser = "refSessionID";
          $(document).attr('location').href='profilePage.html';
        }
      },
      error: function(response){
        alert('not successful ' + {response});
      }
    });
    return false;
});

$(window).resize(function(){
  resize();
});
