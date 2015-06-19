var name = ["{{name}}","{{userName}}","{{numberOfFollowers}}","{{numberOfPosts}}","{{profilePic}}","{{profileColour}}", "{{isCurrentUser}}"];
var cust = "l";
var data = [
	{url: "http://images.sodahead.com/polls/001176949/fillers_xlarge.jpeg"},
	{url: "http://i25.tinypic.com/14cacci.jpg"},
	{url: "http://i.ytimg.com/vi/tHSA519vVvg/hqdefault.jpg"},
	{url: "http://thedailyfandom.com/wp-content/uploads/2015/01/Why_5d76e0_1095350.jpg"}
];

//edit the contents of the right panels here, note editing this will edit
//all copies as this is the template used by vidList
var Videos = React.createClass({
	render: function(){
		return(
			<div className="row">
				<div className="panel col s6 offset-s5">
					<div className="poster">
						<img className="posterImg" src="http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg" />
						<p>Posted by someone</p>
					</div>
					<img className="vidImg" src={this.props.url} />
					<div className="vidInfo">
						<p id="commentText">check out this video</p>
						<hr/>
						<p>{this.props.likes} likes {this.props.reposts} reposts {this.props.shares} share </p>
						<hr/>
						<div className="comments">
							<p>{this.props.comments} comments</p>
							<form>
								 <div className="row">
        							<div className="input-field col s12">
										<textarea id='comment' className="materialize-textarea"/>
										<label htmlFor="comment"> Enter something Nice </label>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

//vidList is the container for the growable list of panels, if the actual
//panels must be edited use Video. if additional types of panels must be edited
//do that here
var VidList = React.createClass({
	render: function(){
		var imageNodes = this.props.data.map(function(vidUrl){
			return(
				<Videos url={vidUrl.url} likes="2" reposts="2" shares="5" comments="2"/>
			);
		});
		return(
			<div className = "pictures">
				{imageNodes}
			</div>
		);
	}
});

//profileInfo is the information contained in the left pushpin, all
// modifications can be done here
var ProfileInfo = React.createClass({
	render: function(){
		return(
			<div id="profileRow" className="row">
				<div className = "profileInfo">
					<img className ="profilePic" src="https://instagramimages-a.akamaihd.net/profiles/profile_230790170_75sq_1391224426.jpg" /><br />
					<p className="profileName"> {this.props.cust} </p>
					<p className="description"> {this.props.desc} </p>
					<table className = "stats">
						<tr>
							<td>{this.props.posts} <br />posts</td>
							<td>{this.props.followers}<br />followers</td>
							<td id="lastCell">{this.props.following} <br />following</td>
						</tr>
					</table>
					<form>
						<button className="btn waves-effect waves-green" type="submit" name="action"><i className="mdi-content-add"></i>following
						</button>
					</form>
				</div>
			</div>
		);
	}
});

//this will edit the content of the navbar
var Navbar = React.createClass({
	render: function(){
		return(
			<div  className="navbar-fixed">
				<nav>
					<div className = "nav-wrapper">
						<a href='#' className="brand-logo"> Hello, {this.props.cust} </a>
						<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
						<ul className="right hide-on-med-and-down">
							<li>
								<form>
								<div className="input-field">
									<input id="navSearch" type="search" placeholder="search" onfocus="searchChange /"/>
									<label htmlFor="navsearch"><i className="mdi-action-search"></i></label>
								</div>
								</form>
							</li>
							<li id="logoutBut">
								<div className="input-field">
									<form action="http://localhost:3000/users/logout" method="GET">
										<button className="btn waves-effect waves-light" type="submit" id="logout">logout
										</button>
									</form>
								</div>
							</li>
						</ul>
						<ul className="side-nav" id="mobile-demo">
					     	<li>
								<form>
									<div className="input-field">
										<input id="navSearch" type="search" placeholder="search" />
										<label htmlFor="navsearch"><i className="mdi-action-search"></i></label>
									</div>
								</form>
							</li>
							<li id="logoutBut">
								<div className="input-field">
									<form action="http://localhost:3000/users/logout" method="GET">
										<button className="btn waves-effect waves-light" type="submit" name="action">logout
										</button>
									</form>
								</div>
							</li>
				     	</ul>
					</div>
				</nav>
			</div>
		);
	}
});

//the Parent of all elements below, this will handle any properties that
//must be passed to the children
var Content = React.createClass({
	//getInitialState will run when the component first loads and will initialize part of its state
	getInitialState: function() {
		cust = "ral";
    	return {custName: cust};
  	},
  	//componentDidMount will run at every rerender and will read info from server
	componentDidMount: function(){
		this.setState({custName: info[0]});
		console.log(info[0]);
	},
	//render will recreate the components and everything thatis on the screen starts here
	render: function(){
		return(
			<div className = "profilePage">
				<Navbar cust = {this.state.custName} />
				<ProfileInfo cust = {this.state.custName} posts="2" followers={name[2]} following="3" desc={"welcome to my imstavine, I do photos and imgurs and vines and grams I currently have _ foloowers"} />
				<VidList data={this.props.data} likes="3" reposts="2" shares="0" comments="0"/>
			</div>
		);
	}
});

//the root this calls the parent with some dummy data
React.render(
	<Content data={data} />,
	document.getElementById("content")
);

//allows for multi displays by monitoring screen size
var handleResize = function(){
	var windWidth = parseInt($("body").css("width"));
	//reorganize the page if the screen size is small
	if(windWidth < 975){
		//This is for small screen organization
		$(".profileInfo").addClass("smallScreen");
		//recenter the panel if the screen is small
		$(".panel").removeClass("col s5 offset-s5")>
		$(".pictures").addClass("smallScreen");
	}else{
		//return to a lare screen organization
		$(".profileInfo").removeClass("smallScreen");
		$(".panel").addClass("col s5 offset-s5")>
		$(".pictures").removeClass("smallScreen");
	}
}

var searchChange = function(){
	console.log("sup");
	$(logoutBut).css("display","none");
}

//monitors screen resize
$(window).resize(function(){
	handleResize();
});

//checks for document loading
$(document).ready(function(){
	$(".button-collapse").sideNav();
	handleResize();
})
