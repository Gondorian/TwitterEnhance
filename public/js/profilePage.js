var cust = "l";
var data = [
	{url: "http://images.sodahead.com/polls/001176949/fillers_xlarge.jpeg", text: "Above is a filler"},
	{url: "http://i25.tinypic.com/14cacci.jpg", text: "Check out this video"},
	{url: "http://i.ytimg.com/vi/tHSA519vVvg/hqdefault.jpg", text: "Another comment was written here"},
	{url: "http://thedailyfandom.com/wp-content/uploads/2015/01/Why_5d76e0_1095350.jpg", text: "Me and my dad at the park"}
];

var comments=[
	{poster: "travis goodwin", text: "This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool im This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img"},
	{poster: "Paul Azevedo", text: "This anime wasn't too amazing"},
	{poster: "Walter Cunningham", text: "This artist was rather skillful"}
];

var Comment = React.createClass({
	render: function(){
		return(
			<div className="commentBox">
				<p id="poster">{this.props.poster}</p>
				<p id="comment">{this.props.comment}</p>
				<hr />
			</div>
		);
	}
});

//below is the comment modal react element
var CommentModal = React.createClass({
	getInitialState: function(){
		return{comments:comments};
	},
	loadCommentsFromServer: function(){
		this.setState({comments: comments});
	},
	componentDidMount: function(){
		this.loadCommentsFromServer
	},
	render:function(){
		var commentNodes = this.state.comments.map(function(comm){
			return(
				<Comment poster={comm.poster} comment={comm.text} />
			);
		});
		return(
		    <div id="commentModal" className="modal modal-fixed-footer">
		    	<div className="modal-content">
		    		{commentNodes}
		     	</div>
		     	<div className="modal-footer">
		        	<a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat">Close</a>
		     	</div>
		    </div>
	    );
	}
});

//edit the contents of the right panels here, note editing this will edit
//all copies as this is the template used by vidList
var Videos = React.createClass({
	clickHandeler: function(){
		React.render(<CommentModal />,document.getElementById("commentMod"));
		//the options for the modal
		$('#commentModal').openModal({
	      	dismissible: false, // Modal can be dismissed by clicking outside of the modal
	      	opacity: .5, // Opacity of modal background
	      	in_duration: 300, // Transition in duration
	      	out_duration: 200, // Transition out duration
	      	complete: function(){ //closes the modal and unmounts the react element
				var result = React.unmountComponentAtNode(document.getElementById("commentMod"));
	      	}
    	});
	},
	render: function(){
		return(
			<div className="row">
				<div className="card col s6 offset-s5">
					<div className="card-content ">
						<img className="posterImg" src="http://www.bdu.edu.et/cos/sites/bdu.edu.et.cos/files/default_images/no-profile-img.gif" />
						<p className="posterName">Posted by someone</p>
					</div>
					<div className="card-image">
						<img className="vidImg" src={this.props.url} />
					</div>
					<div className="card-content">
						<p className="card-title">{this.props.text}</p>
					</div>
					<hr />
					<div className="card-content inline-text">
						<a href="#"><i className="small mdi-action-thumb-up prefix" /> {this.props.likes} likes</a>
						<a href="#"><i className="small mdi-av-repeat" /> {this.props.reposts} reposts </a>
						<a href="#"><i className="small mdi-action-thumb-up prefix" />{this.props.shares} share </a>
					</div>
					<hr />
					<div className="card-content">
						<a id="viewComments" onClick={this.clickHandeler}>{this.props.comments} comments</a>
						<form>
							 <div className="row">
        						<div className="input-field col s12">
									<textarea maxLength="255" id='comment' className="materialize-textarea"/>
									<label htmlFor="comment"> Enter something Nice </label>
								</div>
							</div>
						</form>
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
				<Videos url={vidUrl.url} text={vidUrl.text} likes="2" reposts="2" shares="5" comments="2" />
			);
		});
		return(
			<div className = "pictures">
				{imageNodes}
			</div>
		);
	}
});

//make the follow button
var Follow = React.createClass({
	render: function(){
		return(
			<div>
				<form  id="followForm">
					<button id="followBtn" className="btn waves-effect waves-green" type="submit" name="action"><i className="mdi-content-add"></i>following
					</button>
				</form>
			</div>
		);
	}
});

//make the edit profile button
var Edit = React.createClass({
	acceptChange: function(){
		var post = $('#modalPost').val();
		var title = $('#modalTitle').val();

		if(post!==""){
			data.unshift({url: post, text: title});
		}
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
		$('#editModal').closeModal();
	}.bind(this),
	createModal: function(){
		React.render(<EditModal accept={this.acceptChange}/>,document.getElementById("editMod"));
		//the options for the modal
		$('#editModal').openModal({
	      	dismissible: false, // Modal can be dismissed by clicking outside of the modal
	      	opacity: .5, // Opacity of modal background
	      	in_duration: 300, // Transition in duration
	      	out_duration: 200, // Transition out duration
	      	complete: function(){ //closes the modal and unmounts the react element
				var result = React.unmountComponentAtNode(document.getElementById("editMod"))
	      	}
    	});
	},
	render: function(){
		return(
			<div>
				<a id="editProfile" className="waves-effect waves-light btn"onClick={this.props.buttonClick}>Edit Profile</a>
			</div>
		);
	}
});

//below is the modal for profile editing
var EditModal = React.createClass({
	acceptChange: function(){
		var post = $('#modalPost').val();
		var title = $('#modalTitle').val();

		if(post!==""){
			data.unshift({url: post, text: title});
		}
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
		$('#editModal').closeModal();
	}.bind(this),
	createModal: function(){
		React.render(<EditModal accept={this.acceptChange}/>,document.getElementById("editMod"));
		//the options for the modal
		$('#editModal').openModal({
	      	dismissible: false, // Modal can be dismissed by clicking outside of the modal
	      	opacity: .5, // Opacity of modal background
	      	in_duration: 300, // Transition in duration
	      	out_duration: 200, // Transition out duration
	      	complete: function(){ //closes the modal and unmounts the react element
				var result = React.unmountComponentAtNode(document.getElementById("editMod"))
	      	}
    	});
	},
	render: function(){
		return(
		<div id="editModal" className="modal modal-fixed-footer">
	      <div className="modal-content">
	        <h4> {{name}} </h4>
	          <form id="modalForm">
	            <input id="modalImg" type="text" placeholder="Profile Picture"/>
	            <input id="modalColor" type="text" placeholder="Profile Color" /><br />
	            <input id="modalPost" type="text" placeholder="Post" />
	            <input id="modalTitle" type="text" placeholder="Video Title" />
	            <div className="file-field input-field">
	              <input className="file-path validate" type="text"/>
	              <div className="btn">
	                <span>File</span>
	                <input type="file" />
	              </div>
	            </div>
	          </form>
	      </div>
	      <div className="modal-footer">
	        <a href="#!" onClick={this.props.accept} className="modal-action waves-effect waves-green btn-flat ">Agree</a>
	        <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat ">Cancel</a>
	      </div>
	    </div>
		);
	}
});


//profileInfo is the information contained in the left pushpin, all
// modifications can be done here
var ProfileInfo = React.createClass({
	getInitialState: function(){
		if(info[6] === 'true'){
			return({button: <Edit buttonClick={this.props.buttonClick}/>});
		}else{
			return({button: <Follow />});
		};
	},
	render: function(){
		return(
			<div id="profileRow" className="row">
				<div className = "profileInfo">
					<img className ="profilePic" src={this.props.profileURL} /><br />
					<p className="profileName"> {this.props.cust} </p>
					<p className="description"> {this.props.desc} </p>
					<table className = "stats">
						<tr>
							<td>{this.props.posts} <br />posts</td>
							<td>{this.props.followers}<br />followers</td>
							<td id="lastCell">{this.props.following} <br />following</td>
						</tr>
					</table>
					{this.state.button}
				</div>
			</div>
		);
	}
});

//the Component that will be shown when the profile is being edited
var EditProfileInfo = React.createClass({
	render: function(){
		return(
			<div id="profileRow" className="row">
				<div className = "profileInfo">
					<form id="profileForm">
						<input id="profilePicInput" type="text" placeholder="Profile Picture URL" />
						<img className ="profilePic editable" src={this.props.profileURL} /><br />
						<input id="profileName" type="text" className="profileName editable" defaultValue={this.props.cust} placeholder="Username"/>
						<textarea id="description" className="materialize-textarea description editable" defaultValue={this.props.desc}  placeholder="ProfileDescription"/>
					</form>
					<table className = "stats">
						<tr>
							<td>{this.props.posts} <br />posts</td>
							<td>{this.props.followers}<br />followers</td>
							<td id="lastCell">{this.props.following} <br />following</td>
						</tr>
					</table>
					<a id="editProfile" className="waves-effect waves-light btn" onClick={this.props.buttonClick}> stop Edit</a>
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
							<li className='dropdown-button'data-beloworigin="true" data-outduration="1000000" data-gutter="30" href='#' data-activates='dropdown1'>
								<a id="profileBut" className='btn-floating'><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href="#!">profilePage</a></li>
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
	//the doneEdit event triggers when the user hits done editing on the proile page
	doneEdit: function(){
		console.log("done editing");
		if(document.getElementById('profilePicInput').value !== "")	this.setState({profileURL: document.getElementById('profilePicInput').value});
		if(document.getElementById('profileName').value !== "") this.setState({custName: document.getElementById('profileName').value})
		this.setState({description: document.getElementById('description').value},function(){
			this.setState({profileSection: <ProfileInfo buttonClick={this.editMode} myProfile={true} profileURL={this.state.profileURL} cust = {this.state.custName} posts={info[3]} followers={info[2]} following={info[8]} desc={this.state.description} />});
		});
	},//edit mode will activate the edit profile settings and allow for in line editing
	editMode: function(){
		//changes the aside to an editable version
		console.log("entering edit mode");
		this.setState({profileURL:info[4]}, function(){
			this.setState({profileSection: <EditProfileInfo buttonClick={this.doneEdit} myProfile={true} profileURL={this.state.profileURL} cust={info[0]} posts={info[3]} followers={info[2]} following={info[8]} desc={"welcome to my imstavine, I do photos and imgurs and vines and grams I currently have _ foloowers"} />});
		});
	},
	loadPostsFromServer: function(){
		this.setState({dat:data});
	},//getInitialState will run when the component first loads and will initialize part of its state
	getInitialState: function() {
		cust = "ral";
		//change the profile picture to match the database
		if(info[4]==="default"){
			info[4] = "http://www.bdu.edu.et/cos/sites/bdu.edu.et.cos/files/default_images/no-profile-img.gif";
			console.log("was default: " + info[4]);
		}
    	return ({profileSection:<ProfileInfo buttonClick={this.editMode} myProfile={true} profileURL={info[4]} cust={info[0]} posts={info[3]} followers={info[2]} following={info[8]} desc={"welcome to my imstavine, I do photos and imgurs and vines and grams I currently have _ foloowers"} />})
  	},
  	//componentDidMount will run at every rerender and will read info from server
	componentDidMount: function(){
		setInterval(this.loadPostsFromServer, this.props.pollInterval);
	},
	componentWillMount: function(){
		this.setState({logged: info[7]})
		this.setState({custName: info[0]});
		this.setState({dat:data});
	},
	//render will recreate the components and everything thatis on the screen starts here
	render: function(){
		return(
			<div className = "profilePage">
				<Navbar cust = {this.state.logged} />
				{this.state.profileSection}
				<VidList data={this.state.dat} likes="3" reposts="2" shares="0" comments="0"/>
			</div>
		);
	}
});


//the root this calls the parent with some dummy data
React.render(
	<Content pollInterval={200}/>,
	document.getElementById("content")
);














//below is the update for profile information
function submitForm(){
    $.ajax({
      url: "http://localhost:3000/users/updateProfile",
      type: 'POST',
      data: $('#profileForm').serialize(),
      success: function(response){
        if(response.length < 40){
          Materialize.toast(response,10000);
        }else{
          $(document).attr('location').href='/'
        }
      },
      error: function(response){
        //alert('not successful ' + {response});
      }
    });
    return false;
};

//below is the ajax post for the edit button form
$('#modalForm').submit(function(){
      $.ajax({
      url: "http://localhost:3000/users/login",
      type: 'POST',
      data: $('#modalForm').serialize(),
      success: function(response){
        if(response.length < 40){
          Materialize.toast(response,10000);
        }else{
          $(document).attr('location').href='/'
        }
      },
      error: function(response){
        //alert('not successful ' + {response});
      }
    });
    return false;
});

$('#followForm').submit(function(){
	console.log(info[1]);
	console.log(info[7]);
      $.ajax({
      url: "http://localhost:3000/users/follow",
      type: 'POST',
      data: {userName:info[1]},
      success: function(response){
        if(response == "Added to following!"){
          Materialize.toast(response,10000);
        }
      },
      error: function(response){
        //alert('not successful ' + {response});
      }
    });
    return false;s
});

//allows for multi displays by monitoring screen size
var handleResize = function(){
	var windWidth = parseInt($("body").css("width"));
	//reorganize the page if the screen size is small
	if(windWidth < 975){
		//This is for small screen organization
		$(".profileInfo").addClass("smallScreen");
		//recenter the panel if the screen is small
		$(".card").removeClass("s6 offset-s5");
		$(".card").addClass("s12");
		$(".card").addClass("centerd");
	}else{
		//return to a lare screen organization
		$(".profileInfo").removeClass("smallScreen");
		$(".card").addClass("s6 offset-s5");
		$(".card").removeClass("s12");
		$(".card").removeClass("centerd");
	}
}


 $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrain_width: false, // Does not change width of dropdown to that of the activator
     hover: true, // Activate on hover
     gutter: 1000, // Spacing from edge
     belowOrigin: true // Displays dropdown below the button
   }
 );

//click event handler


//monitors screen resize
$(window).resize(function(){
	handleResize();
});

//checks for document loading
$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.modal-trigger').leanModal();
	$('nav').css("background-color",info[5]);


	handleResize();
})
