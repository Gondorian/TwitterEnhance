
var Aside = React.createClass({
	render: function(){
		return(
			<div className="sideBar">


			</div>
		);
	}
});

var Panel = React.createClass({
	render: function(){
		return(
			<div className="panel">
				{this.props.test}
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
			<div className = "navbar">
				<form>
					<input type="text" placeholder="search" />
				</form>
			</div>
		);
	}
});

var Content = React.createClass({
	render: function(){
		return(
			<div className="wrapper">
				<Navbar />
				<FancyNavbar />
				<div className="newBody">
					<div className="content">
						<Aside />
						<div className="panelList">
							<Panel test={"sup"}/>
							<Panel test={"not"}/>
							<Panel test={"now"}/>
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

$(window).scroll(function(){
	var wScroll = $(this).scrollTop();
	console.log(1-(wScroll/400));
	if(wScroll > 350){
		$(".navbar").css('display','block');
	}else{
		$(".navbar").css('display','none');
	}
	$("#fancySearch").css("opacity", 1-(wScroll/100) );
	$("#fancySearch").css("transform",'translateY(-' + wScroll +'px)');
});