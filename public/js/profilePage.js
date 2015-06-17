var cust = "l";
var data = [
	{url: "http://images.sodahead.com/polls/001176949/fillers_xlarge.jpeg"},
	{url: "http://i25.tinypic.com/14cacci.jpg"},
	{url: "http://i.ytimg.com/vi/tHSA519vVvg/hqdefault.jpg"},
	{url: "http://thedailyfandom.com/wp-content/uploads/2015/01/Why_5d76e0_1095350.jpg"}
];

var Videos = React.createClass({
	render: function(){
		return(
			<div className="panel">
				<div className="poster">
					<img className="posterImg" src="http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg" />
					<p>Posted by someone</p>
				</div>
				<img className="vidImg" src={this.props.url} />
				<div className="vidInfo">
					<p id="commentText">check out this video</p>
					<hr/>
					<p>___ likes___ reposts ____ share </p>
					<hr/>
					<div className="comments">
						<p>__ comments</p>
						<form>
							<input type="text" id='comment' maxlength="255" placeholder="enter something Nice" />
						</form>
					</div>
				</div>
			</div>
		);
	}
});

var VidList = React.createClass({
	render: function(){
		var imageNodes = this.props.data.map(function(vidUrl){
			return(
				<Videos url={vidUrl.url} />
			);
		});
		return(
			<div className = "pictures">
				{imageNodes}
			</div>
		);
	}
});

var ProfileInfo = React.createClass({
	render: function(){
		return(
			<div className = "profileInfo">
				<img className ="profilePic" src="https://instagramimages-a.akamaihd.net/profiles/profile_230790170_75sq_1391224426.jpg" /><br />
				<p className="profileName"> {this.props.cust} </p>
				<p className="description"> {this.props.desc} </p>
				<table className = "stats">
					<tr>
						<td>___ <br />posts</td>
						<td>___ <br />followers</td>
						<td id="lastCell">___ <br />following</td>
					</tr>
				</table>
				<form>
					<input type="submit" value="FOLLOWING" /> 
				</form>
			</div>
		);
	}
});

var Navbar = React.createClass({
	render: function(){
		return(
			<div className = "navbar">
				<p> Hello, {this.props.cust} </p>
				<form action="http://localhost:3000/users/logout" method="GET">
					<input className="button" type="submit" value="logout"/>
				</form>
				<form>
					<input id="navSearch" type="text" placeholder="search" />
				</form>
			</div>
		);
	}
});


var Content = React.createClass({
	getInitialState: function() {
		cust = "ral";
    	return {custName: cust};
  	},
	componentDidMount: function(){
	$.ajax({
      	url: "http://localhost:3000/users/profileName",
      	dataType: 'json',
      	cache: false,
      	success: function(data) {
      		console.log("read from server" + data);
        	this.setState({custName: data});
      	}.bind(this),
      	error: function(xhr, status, err) {
	        console.log("bruh this aint returning no response");
			console.log(status);
			console.log(xhr);
      	}.bind(this)
    });
	},
	render: function(){
		return(
			<div className = "profilePage">
				<Navbar cust = {this.state.custName} />
				<ProfileInfo cust = {this.state.custName} desc={"welcome to my imstavine, I do photos and imgurs and vines and grams I currently have _ foloowers"} />
				<VidList data={this.props.data} />
			</div>
		);
	}
});

React.render(
	<Content data={data} />,
	document.getElementById("content")
);

var handleResize = function(){
	var windWidth = parseInt($("body").css("width"));
	console.log(windWidth);
	if(windWidth < 950){
		$(".profileInfo").addClass("smallScreen");
		$(".pictures").addClass("smallScreen");
	}else{
		$(".profileInfo").removeClass("smallScreen");
		$(".pictures").removeClass("smallScreen");
	}
}


$(window).resize(function(){
	handleResize();
});

$(document).ready(function(){
	handleResize();
})
