var cust = "l";
var data = [
	{url: "http://images.sodahead.com/polls/001176949/fillers_xlarge.jpeg", text: "Above is a filler"},
	{url: "http://i25.tinypic.com/14cacci.jpg", text: "Check out this video"},
	{url: "http://i.ytimg.com/vi/tHSA519vVvg/hqdefault.jpg", text: "Another comment was written here"},
	{url: "http://thedailyfandom.com/wp-content/uploads/2015/01/Why_5d76e0_1095350.jpg", text: "Me and my dad at the park"}
];


//edit the contents of the right panels here, note editing this will edit
//all copies as this is the template used by vidList
var Videos = React.createClass({
	render: function(){
		return(
			<div className="row">
				<div className="panel col s6 offset-s5">
					<div className="poster">
						<img className="posterImg" src="http://www.bdu.edu.et/cos/sites/bdu.edu.et.cos/files/default_images/no-profile-img.gif" />
						<p>Posted by someone</p>
					</div>
					<img className="vidImg" src={this.props.url} />
					<div className="vidInfo">
						<p id="commentText">{this.props.text}</p>
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
				<Videos url={vidUrl.url} text={vidUrl.text} likes="2" reposts="2" shares="5" comments="2"/>
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
					<img className ="profilePic" src="http://www.bdu.edu.et/cos/sites/bdu.edu.et.cos/files/default_images/no-profile-img.gif" /><br />
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
					<a id="editProfile" className="modal-trigger waves-effect waves-light btn" href="#modal1">Edit Profile</a>
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
							<li id="searchHover">
								<form>
								<div className="input-field">
									<input id="navSearch" type="search" placeholder="search" onfocus="searchChange()"/>
									<label htmlFor="navsearch"><i className="mdi-action-search"></i></label>
								</div>
								</form>
							</li>
							<li>
								<a id="profileBut" className='dropdown-button btn-floating' data-beloworigin="true" data-gutter="-40" href='#' data-activates='dropdown1'><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href="#!">profilePage</a></li>
									<li id="logoutBut">
										<div className="input-field">
											<form action="http://localhost:3000/users/logout" method="POST">
												<button className="btn waves-effect waves-light" type="submit" id="logout">logout
												</button>
											</form>
										</div>
									</li>
								</ul>
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
									<form action="http://localhost:3000/users/logout" method="POST">
										<button className="btn waves-effect waves-light" type="submit">logout
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
	loadPostsFromServer: function(){
		this.setState({custName: info[0]});
		this.setState({dat:data});
	},
	getInitialState: function() {
		cust = "ral";

    	return {dat: data};
  	},
  	//componentDidMount will run at every rerender and will read info from server
	componentDidMount: function(){
		console.log("data: "+ this.state.dat);
		setInterval(this.loadPostsFromServer, this.props.pollInterval);
	},
	//render will recreate the components and everything thatis on the screen starts here
	render: function(){
		return(
			<div className = "profilePage">
				<Navbar cust = {this.state.custName} />
				<ProfileInfo cust = {this.state.custName} posts={info[3]} followers={info[2]} following="3" desc={"welcome to my imstavine, I do photos and imgurs and vines and grams I currently have _ foloowers"} />
				<VidList data={this.state.dat} likes="3" reposts="2" shares="0" comments="0"/>
			</div>
		);
	}
});

//the root this calls the parent with some dummy data
React.render(
	<Content />,
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


 $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrain_width: false, // Does not change width of dropdown to that of the activator
     hover: true, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: true // Displays dropdown below the button
   }
 );
 
 //activates when the accept button is pressed on the modal screen
function completeForm() {
	//find post and modify data
	var post = $('#modalPost').val();
	var title = $('#modalTitle').val();
	
	if(post!==""){
		data.unshift({url: post, text: title});
	}
	console.log(data[3].title);


	//change the profile picture
	var image = $('#modalImg').val();
	if(image!==""){
		$('.profilePic').attr('src', image);
	}

	//change the profile color
	var col = $('#modalColor').val();
	if(col!==""){
		$('nav').css("background-color",col);
	}

	//close the modal when done
	document.getElementById("modalForm").reset();
	$('#modal1').closeModal();
}

//monitors screen resize
$(window).resize(function(){
	handleResize();
});

//checks for document loading
$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.modal-trigger').leanModal();
	$('nav').css("background-color",info[5]);

	//change the profile picture to match the database
	if(info[4]!=="default"){
		$('.profilePic').attr("src",info[4]);
	}
	handleResize();
})
