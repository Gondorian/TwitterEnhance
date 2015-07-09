var ip = "192.168.2.19";
var info;
var mode = 'name';//default is name, used for tab selection
//all profiles taken from the server
var profile = [
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"},
	{url:"/design/balloons.png", name:"Sivart"},
	{url:"/design/sunset.jpg", name:"Rastiv"},
	{url:"/design/MaleFace1.jpg", name:"Virast"}
];
//the profiles that are currently shown to the user
var shownName = [

];

var shownTags = [

]
 var blank = [

 ];

//each individual profile panel
var ProfileInfo = React.createClass({
	render: function(){
		return(
			<div className="profilePanel invis valign-wrapper">
				<img className="profileImg valign" src={this.props.profileURL} />
				<a className="icon waves-effect waves-light btn"><i className="large mdi-social-person-add"></i></a>
				<a className="profileName" href={"http://"+ip+"/users/"}>{this.props.profileName}</a>
			</div>
		);
	}
});

//holds the list of profiles
var ProfileList = React.createClass({
	render: function(){
		var profileNodes = this.props.profile.map(function(prof){
			return(
				<ProfileInfo profileURL={prof.url} profileName={prof.name} />
			);
		});
		return(
			<div className="profileList">
				{profileNodes}
			</div>
		);
	}
});

//Select Search type
var Selector = React.createClass({
	render: function(){
		return(
			<div className="row">
				<div className="col s12">
					<ul className="tabs">
						<li className="tab col s6"><a onClick={this.props.nch}>Name</a></li>
						<li className="tab col s6"><a onClick={this.props.tch}>tags</a></li>
					</ul>
				</div>
			</div>
		);
	}
});

//navbar elements are located here
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
							<li className='dropdown-button'data-beloworigin="true" data-outduration="1000000" data-gutter="30" href='#' data-activates='dropdown1'>
								<a id="profileBut" className='btn-floating' href="/users/"><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href={"/users//post"} >profilePage</a></li>
									<li id="logoutBut">
										<div className="input-field">
											<form action="http://localhost:3000/users/logout" method="POST">
												<button className="btn-flat" type="submit" id="logout">logout</button>
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
										<button className="btn-flat" type="submit" id="logout">logout</button>
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

//this is the father of all panels to follow
var Content = React.createClass({
	nameClickHandeler: function(){
		console.log("name was clicked");
		this.setState({profile: blank});
		console.log(mode);
		mode = 'name';
	},
	tagClickHandeler: function(){
		console.log("tags was clicked");
		this.setState({profile: blank});
		mode = 'tags';
	},
	//getInitialState will run when the component first loads and will initialize part of its state
	getInitialState: function() {
		//change the profile picture to match the database
    	return ({profile: shownName});
  	},
	loadProfile: function(){
		$(".invis").addClass('shown');
		$(".invis").removeClass('invis');
		if(mode=="name"){
			//display the results for names
			this.setState({profile:shownName});
		}else{
			//display the results for tags
			this.setState({profile:shownTags});
		}
	},
	componentDidMount: function(){
		setInterval(this.loadProfile, this.props.pollInterval);
	},
	render: function(){
		return(
			<div className = "content">
				<Navbar />
				<Selector tch={this.tagClickHandeler} nch={this.nameClickHandeler}/>
				<ProfileList profile={this.state.profile}/>
			</div>
		);
	}
});

//the root this calls the parent with some dummy data
React.render(
	<Content pollInterval={20} profile={profile}/>,
	document.getElementById("content")
);


/************************
*   Requests To Server  *
************************/
//recieve the profile list from the server
function getResults(name){
	$.ajax({
      url: "http://"+ip+":3000/users/searchName?name="+name,
      type: 'GET',
      success: function(response){
        console.log(response);
      },
      error: function(response){
      	console.log(response);
        alert('not successful ' + {response});
      }
    });
    return false;
}

/************************
*    Javascript Code    *
************************/
var offset = 7;

$(document).ready(function(){
	console.log("document is ready");
	//handle the original panels that are place on the screen
	var height = $(window).height();
	console.log(height);
	offset = parseInt(height/100)+1;
	console.log(offset);
	for(var i = 0; i<offset; i++){
		shownName.push(profile[i]);
		shownTags.push(profile[i+1]);
	}
	$('ul.tabs').tabs();
	$(".button-collapse").sideNav();
});

var numNameShown = 0;
var numTagShown = 0;

//looks for mouse scroll on the window
$(window).scroll(function(){
	//the value the screen has moved in pixels from the top
	var wScroll = $(this).scrollTop();
	console.log(mode);
	//more is used to avoid errors with scrolling
	var more = true; 
	if(mode == "name"){
		//fill shownName
		while(more){
			more =false;
			if(wScroll > numNameShown*100 && profile.length>numNameShown+offset){
				//loads the new profile if there are more to load
				try{
					shownName.push(profile[numNameShown+offset]);
					numNameShown++;
					more = true;
				}catch(err){
					console.log("error occured: "+err);
				}
			}
		}
	}else{
		//fill shownTags
		while(more){
			more =false;
			if(wScroll > numTagShown*100 && profile.length>numTagShown+offset){
				//loads the new profile if there are more to load
				try{
					shownTags.push(profile[numTagShown+offset]);
					numTagShown++;
					more = true;
				}catch(err){
					console.log("error occured: "+err);
				}
			}
		}
	}
});