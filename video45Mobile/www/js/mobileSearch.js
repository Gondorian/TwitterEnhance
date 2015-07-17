var ip = "192.168.2.19";
var info = ["","","","","design/balloons.png","", "true", "", "",""];
var mode = 'name';//default is name, used for tab selection
//all profiles taken from the server
var profile = [

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
	nameClick: function(){
		sessionStorage.viewedUser = this.props.profileName;
		$(document).attr('location').href='profilePage.html'
	},
	render: function(){
		return(
			<div className="profilePanel invis row">
				<img className="profileImg col s4" src={this.props.profileURL} />
				<a className="flow-text profileName col s6" onClick={this.nameClick}>{this.props.profileName}</a>
				<a className="icon waves-effect waves-light btn col s2"><i className="large mdi-social-person-add"></i></a>
			</div>
		);
	}
});

//holds the list of profiles
var ProfileList = React.createClass({
	render: function(){
		var profileNodes = this.props.profile.map(function(prof){
			return(
				<ProfileInfo profileURL={prof.profilePic} profileName={prof.userName} />
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

//The search bar and button
var Search = React.createClass({
	searchClick: function(){
		console.log("search was clicked");
		if(document.getElementById('searchField')!==''){
			getResults($('#searchField').val());
		}
	},
	render: function(){
		return(
			<div id="searchArea" className="search row">
				<div className="col s8">
					<form id="contactForm">
			        	<div className="input-field">
			          		<input id="searchField" onChange={this.searchClick} type="search" required />
			        	</div>
			        </form>
				</div>
				<div className="col s4">
					<a id="btnSearch" className="btn-flat waves-light" onClick={this.searchClick}> Search </a>
				</div>
			</div>
		);
	}
});

//this will edit the content of the navbar
var Navbar = React.createClass({
	profileClick: function(){
		sessionStorage.viewedUser = "refSessionID";
		$(document).attr('location').href='profilePage.html'
	},
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
								<a id="profileBut" className='btn-floating' href={"/users/"+info[7]}><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href={"/users/"+info[7]+'/post'} >profilePage</a></li>
									<li id="logoutBut">
										<div className="input-field">
											<form action={"http://"+ip+":3000/users/logout"} method="POST">
												<button className="btn-flat" type="submit" id="logout">logout</button>
											</form>
										</div>
									</li>
								</ul>
							</li>
						</ul>
						<ul className="side-nav" id="mobile-demo">
							<li><a onClick={this.profileClick} >Profile Page</a></li>
							<li id="logoutBut">
								<a className="btn-flat" onClick={logout}> logout </a>
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
		this.setState({custName:info[0]});
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
				<Navbar cust={this.state.custName}/>
				<Search />
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

//allows the search button to be clicked on the soft keyboard
$('#contactForm').submit(function () {
	var param = document.getElementById("searchField").value;
	console.log(param);
	getResults(param);
	console.log("reached submit");
	return false;
});

function refreshInfo(userName){
    $.ajax({
      url: "http://"+ip+":3000/users/getProfile?userName="+userName,
      type: 'GET',
      success: function(response){
       info = [response["name"],response["userName"],response["numberOfFollowers"],response["numberOfPosts"],response["profilePic"],response["profileColour"],response["isCurrentUser"],response["currentUserName"],response["numberOfFollowing"],response["profileDescription"]];
       console.log("you are this pages owner: " + info[6]);
       $('nav').css("background-color",info[5]);
       $("#searchArea").css("background-color",info[5]);
      },
      error: function(response){
       console.log('Error: ' + response);
        alert('Refresh not successful ' + {response});
      }
    });
    return false;
};

//recieve the profile list from the server
function getResults(name){
	$.ajax({
      url: "http://"+ip+":3000/users/searchName?name="+name,
      type: 'GET',
      success: function(response){
      	shownName=[];
      	shownTags=[];
      	console.log("response from get Results was: ");
        console.log(response);
        profile = response;
        //handle the original panels that are place on the screen
		var height = $(window).height();
		console.log(height);
		offset = parseInt(height/100)+1;
		console.log("offset: "+offset);
		console.log("profile size: "+profile.length);
		for(var i = 0; i<offset&&i<profile.length; i++){
			shownName.push(profile[i]);
			shownTags.push(profile[i+1]);
		}

      },
      error: function(response){
      	console.log(response);
        alert('getResults not successful ' + {response});
      }
    });
    return false;
}

//handel the logout
var logout = function(){
	console.log("exiting");
	$.ajax({
      url: "http://"+ip+":3000/users/logout",
      type: 'POST',
      success: function(response){
      	localStorage.Logged = "";
	    $(document).attr('location').href='index.html';
      },
      error: function(response){
      	localStorage.Logged = "";
		$(document).attr('location').href='index.html'
      }
    });
    return false;
};


/************************
*    Javascript Code    *
************************/



//the offset is the number of searched items that must be loaded to fill the screen
//and allow for scrolling
var offset = 7;

$(document).ready(function(){
	console.log("document is ready");
	refreshInfo("refSessionID");

	$('ul.tabs').tabs();
	$(".button-collapse").sideNav();
});

//these two values indicate the number of shown items that have appeared so far
//this allows for dynamic loading of the objects.
var numNameShown = 0;
var numTagShown = 0;

//looks for mouse scroll on the window
$(window).scroll(function(){
	//the value the screen has moved in pixels from the top
	var wScroll = $(this).scrollTop();
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