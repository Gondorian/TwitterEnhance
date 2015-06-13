var Navbar = React.createClass({
  render:function(){
    return(
      <div className="navbar">
        <form className="languageChoice">
        language:
          <select>
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
        </form>
      </div>
    );
  }
});

var LoginBox =React.createClass({
  render: function(){
    return(
      <div className="loginBox">
        <form className ="form">
          <input type="text" placeholder="Email" /><br/>
          <input type="password" placeholder="Password" id="password"/>
          <input type="submit" value="Log In" id="logButton" />
          <input type="checkbox" value="remember" className="check"/> Remember me
          <a href="#">Forgot Password? </a>
        </form>
      </div>
    );
  }
});

var RegisterBox = React.createClass({
  render: function() {
    return (
      <div className="registerBox">
      <form className="form" action="http://localhost:3000/users/register" method="POST">
      <h3><b>New to Video45?</b> Sign up</h3><hr />
          <input type="text" placeholder="Full Name" name="fullName" /><br/>
          <input type="text" placeholder="Email" name="email"/><br/>
          <input type="password" placeholder="Password" id="pass" name="password"/><br/>
          <input type="submit" value="Sign up for Video45" id="regButton"/>
        </form>
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
          <LoginBox />
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
<<<<<<< HEAD:public/js/Comments.js
=======


var toggleHelp = 1;

var imageToggle = function(){
  if(toggleHelp==1){
    $('#wrapper').css('background-image','url("http://i.imgur.com/a62BBWB.jpg?1")');
  }else{
    $('#wrapper').css('background-image','url("http://cdn.wonderfulengineering.com/wp-content/uploads/2014/03/high-resolution-wallpapers-25.jpg")');
  }
  toggleHelp = toggleHelp*-1;
  setTimeout(function(){
      imageToggle();
  },10000);
}


$(document).ready(function(){
  var width = parseInt($('#wrapper').css('width'));
  if(width<860){
    $('.textField').addClass('largeScreen');
    $('#frontpage').css('margin-top','50px')
  }else{
    $('.textField').removeClass('largeScreen');
    $('#frontpage').css('margin-top','100px')
  }
  imageToggle();
});


$(window).resize(function(){
  var width = parseInt($('#wrapper').css('width'));
  if(width<860){
    $('.textField').addClass('largeScreen');
    $('#frontpage').css('margin-top','50px')
  }else{
    $('.textField').removeClass('largeScreen');
    $('#frontpage').css('margin-top','100px')
  }
  console.log(width);
});

>>>>>>> 90cb76b609b0086ceb94aeaea11e3145451b1157:public/js/frontPage.js
