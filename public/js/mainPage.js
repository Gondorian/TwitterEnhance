
var Aside = React.createClass({
	render: function(){
		return(
			<div className="sideBar">
				<p> Channels </p>
				<img id="icon1" src="https://vine.co/static/images/channels_v2/Sports_trans@2x.png" />
				<img id="icon2" src="https://vine.co/static/images/channels_v2/Science_trans@2x.png" />
				<img id="icon3" src="https://vine.co/static/images/channels_v2/Places_trans@2x.png" />

				<img id="icon4" src="https://vine.co/static/images/channels_v2/News_trans@2x.png" />
				<img id="icon5" src="https://vine.co/static/images/channels_v2/Music_trans@2x.png" />
				<img id="icon6" src="https://vine.co/static/images/channels_v2/Food_trans@2x.png" />

				<img id="icon7" src="https://vine.co/static/images/channels_v2/Fashion_trans@2x.png" />
				<img id="icon8" src="https://vine.co/static/images/channels_v2/Family_trans@2x.png" />
				<img id="icon9" src="https://vine.co/static/images/channels_v2/DIY_trans@2x.png" />

				<img id="icon10" src="https://vine.co/static/images/channels_v2/Comedy_trans@2x.png" />
				<img id="icon11" src="https://vine.co/static/images/channels_v2/Art_trans@2x.png" />
				<img id="icon12" src="https://vine.co/static/images/channels_v2/Animals_trans@2x.png" />
			</div>
		);
	}
});

var Panel = React.createClass({
	render: function(){
		return(
			<div className="panel">
				<img src="http://www.vlognation.com/wp-content/uploads/2013/12/YouTube_Vlog.jpg" />
				<p>{this.props.test}</p>
			</div>
		);
	}
});

var FancyNavbar = React.createClass({
	render: function(){
		return(
			<div className = "fancyNavbar">
				<h1> Video45 </h1>
				<form>
					<input type="text" placeholder="search" id="fancySearch" />
				</form>
			</div>
		)
	}
})

var Navbar = React.createClass({
	render: function(){
		return(
			<div className = "navbar" >
				<p> Hello, {this.props.cust}</p>
				<form action="http://localhost:3000/users/logout" method="GET">
					<input className="button" type="submit" value="logout"  />
				</form>
				<form>
					<input id="navSearch" type="text" placeholder="search" />
				</form>
			</div>
		);
	}
});

var Content = React.createClass({
	render: function(){
		return(
			<div className="wrapper">
				<Navbar cust={"Travis"}/>
				<FancyNavbar />
				<div className="newBody">
					<div className="content">
						<Aside />
						<div className="panelList">
							<p> Videos </p>
							<Panel test={"#flying"}/>
							<Panel test={"#Selfie"}/>
							<Panel test={"#Notrepetitve.jpg"}/>
						</div>
					</div>	
				</div>
			</div>
		);
	}
});

React.render(
	<Content />,
	document.getElementById("content")
);

$(document).ready(function(){
	$.get( "http://localhost:3000/users/profileName", function( data ) {
  		alert( "Data Loaded: " + data );
	});
});

$(window).scroll(function(){
	var wScroll = $(this).scrollTop();
	if(wScroll > 350){
		$(".navbar").addClass('visible');
		$("#navSearch").css('display','inline')
	}else{
		$(".navbar").removeClass('visible');
		$("#navSearch").css('display','none')
	}
	$("#fancySearch").css("opacity", 1-(wScroll/100) );
	$("#fancySearch").css("transform",'translateY(-' + wScroll +'px)');
});