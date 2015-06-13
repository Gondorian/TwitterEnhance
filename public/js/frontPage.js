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
      <form className="form">  
      <h3><b>New to Video45?</b> Sign up</h3><hr />
          <input type="text" placeholder="Full Name" /><br/>
          <input type="text" placeholder="Email" /><br/>
          <input type="password" placeholder="Password" id="pass"/><br/>
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

$(document).ready(function(){
  var width = parseInt($('#wrapper').css('width'));
  if(width<860){
    $('.textField').addClass('largeScreen');
    $('#frontpage').css('margin-top','50px')
  }else{
    $('.textField').removeClass('largeScreen');
    $('#frontpage').css('margin-top','100px')
  }
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