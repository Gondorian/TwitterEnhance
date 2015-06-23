//the react container for the navbar elements
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
      <div classname="row">
        <div className="text col s6">
          <div className="textField">
            <h2>Welcome to <h1>video45</h1></h2><br />
            <h3> Bring Videos to life in 45 seconds </h3>
          </div>
        </div>
      </div>
    );
  }
});

//the login box
var LoginBox =React.createClass({
  render: function(){
    return(
      <div className="loginBox col s6">
        <form id="loginForm" className ="form" action="http://localhost:3000/users/login" method="POST">
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
            <button className="valign btn waves-effect waves-light" type="submit" name="action" id="logButton"> log in</button>
          </div>
          <div className="row">
            <input type="checkbox" value="remember" className="filled-in" name="group" id="remember"/> 
            <label htmlFor="remember" id="remLabel">Remember me</label>
            <a href="#">Forgot Password? </a>
          </div>
        </form>
      </div>
    );
  }
});

var RegisterBox = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="registerBox  col s12">
        <form id = "registration" className="form" action="http://localhost:3000/users/register" method="POST">
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
              <button className="btn waves-effect waves-light" type="submit" name="action" id="regButton">Sign Up For vdeo45</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
});

var FrontPage = React.createClass({
  render: function(){
    return (
      <div className="menus">
        <Navbar />
        <div className="content">
          <div className ="row">
            <Textbox />
            <LoginBox />
          </div>
          <RegisterBox />
        </div>
      </div>
    );
  }
});

React.render(
  <FrontPage />,
  document.getElementById('register')
);




//list of urls that will cycle through on front page
var backs = [
  "url(http://www.best-free-wallpaper.org/wp-content/uploads/2014/09/super-high-resolution-nature-wallpaper.jpg)",
  "url(http://cdn.wonderfulengineering.com/wp-content/uploads/2014/03/high-resolution-wallpapers-25.jpg)"
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
});


$(window).resize(function(){
  resize();
});
