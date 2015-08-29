//var ip = "104.131.218.159";
var ip = "localhost:3000";
var cust = "l";
var data = [
];

var resultData=[];

var comments=[];

var Comment = React.createClass({
	render: function(){
		return(
			<div className="commentBox">
				<a id="poster">{this.props.poster}</a>
				<p id="comment">{this.props.comment}</p>
			</div>
		);
	}
});

//below is the comment modal react element
var CommentModal = React.createClass({
	getInitialState: function(){
		return{comments:this.props.comments};
	},
	loadCommentsFromServer: function(){

		this.setState({comments: this.props.comments});
	},
	componentDidMount: function(){
		this.loadCommentsFromServer
	},
	render:function(){
		var commentNodes = this.props.comments.map(function(comm){
			return(
				<Comment poster={comm.poster} comment={comm.text} />
			);
		});
		return(
		    <div id="commentGroup">
		    		{commentNodes}
		    </div>
	    );
	}
});

//edit the contents of the right panels here, note editing this will edit
//all copies as this is the template used by vidList
var Videos = React.createClass({
	clickHandeler: function(){
		/*
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
		*/
		console.log("inside the click handeler for videos");
		var comments=[
			{poster: "travis goodwin", text: "This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool im This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img This is a cool img"},
			{poster: "Paul Azevedo", text: "This anime wasn't too amazing"},
			{poster: "Walter Cunningham", text: "This artist was rather skillful"}
		];
		this.setState({comments : <CommentModal comments={comments} />});
	},
	getInitialState: function(){
		this.setState({url: URL.createObjectURL(base64ToBlob(this.props.url))});
		console.log(this.state.url)
		return({comments : <CommentModal comments={comments}/>});
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
						<video className="vidImg" src={this.state.url} />
					</div>
					<div className="card-content">
						<p className="card-title">{this.props.text}</p>
					</div>
					<hr />
					<div className="card-content inline-text">
						<a href="#"><i className="small mdi-action-thumb-up prefix" /> {this.props.likes} likes</a>
						<a href="#"><i className="small mdi-av-repeat" /> {this.props.reposts} reposts </a>
						<a href="#"><i className="small mdi-file-cloud prefix" />{this.props.shares} share </a>
					</div>
					<hr />
					<div className="card-content">
						<a id="viewComments" onClick={this.clickHandeler}>{this.props.comments} comments</a>
						{this.state.comments}
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
		if(data.length === 0){
			return(
				<div className="row">
					<div className="card col s6 offset-s5">
						<p className="infoText"> No videos Have been uploaded on your channel please post a video from the button in the bottom corner</p>
					</div>
				</div>
			)
		}else{
			var imageNodes = this.props.data.map(function(vidUrl){
				return(
					<Videos url={vidUrl.url} text={vidUrl.text} likes="2" reposts="2" shares="5" comments="2" />
				);
			});
		}
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
					<a id="followBtn" className="btn waves-effect waves-green" name="action" onClick={this.props.followClick}><i className="mdi-content-add"></i>follow
					</a>
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
	componentDidMount: function(){
	},
	getInitialState: function(){
		if(info[6] === 'true'){
			return({button: <div />});
		}else{
			return({button: <Follow followClick={this.props.followClick} />});
		};
	},
	render: function(){
		return(
			<div id="profileRow" className="row">
				<div className = "profileInfo">
					<img id="profilePic" className ="profilePic" src={this.props.profileURL} /><br />
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
						<input id="profilePicInput" name="picURL" type="text" placeholder="Profile Picture URL" />
						<img id="profilePic" className ="profilePic editable" src={this.props.profileURL} /><br />
						<input id="profileName" name="profileName" type="text" className="profileName editable" defaultValue={this.props.cust} placeholder="Full Name"/>
						<textarea id="description" name="description" className="materialize-textarea description editable" defaultValue={this.props.desc}  placeholder="ProfileDescription"/>
					</form>
					<table className = "stats">
						<tr>
							<td>{this.props.posts} <br />posts</td>
							<td>{this.props.followers}<br />followers</td>
							<td id="lastCell">{this.props.following} <br />following</td>
						</tr>
					</table>
					<a id="editProfile" className="waves-effect waves-light btn" onClick={this.props.buttonClick}> Done Editing</a>
				</div>
			</div>
		);
	}
});

//the individual result panels
var ResultPanel = React.createClass({
	render: function(){
		return(
			<div>
				<li>
					<a className="collection-item avatar" style={{"display": "block;"}} href={"http://"+ip+"/"+this.props.name}>
						<img className="circle" src={this.props.url} />
						<span className="title">{this.props.name}</span>
					</a>
				</li>
			</div>
		);
	}
});

//This will display the results from the elasticsearch below the search bar
var SearchResults = React.createClass({
	render: function(){
		var results = this.props.data.map(function(result){
			return(
				<ResultPanel name={result.userName} url={result.profilePic} />
			);
		});
		return(
			<div>
				{results}
			</div>
		);
	}
});

//this will edit the content of the navbar
var Navbar = React.createClass({
	searchChange: function(){
		console.log("sending get request");
		if(document.getElementById('navSearch').value !==''){
			getSearch();
		}else{
			resultData=[];
		}
	},
	render: function(){
		return(
			<div  className="navbar-fixed">
				<nav style={{"background-color": this.props.color}}>
					<div className = "nav-wrapper">
						<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
						<ul className="right hide-on-med-and-down">
							<li id="searchHover" className='dropdown-button'  hover="false"  constrain_width="true" data-beloworigin="true" data-outduration="1000000" data-gutter="0" data-activates='dropdown2'>
								<form>
								<div className="input-field">
									<input id="navSearch" type="search" placeholder="search" onChange={this.searchChange}/>
									<label htmlFor="navsearch"><i className="mdi-action-search"></i></label>
								</div>
								</form>
								<ul id="dropdown2" className='dropdown-content collection'>
									<SearchResults data={this.props.data}/>
								</ul>
							</li>
							<li className='dropdown-button'data-beloworigin="true" data-outduration="1000000" data-gutter="30" href='#' data-activates='dropdown1'>
								<a id="profileBut" className='btn-floating' href={"/users/"+info[7]}><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href={"/users/"+info[7]+'/post'} >profilePage</a></li>
									<li id="logoutBut">
										<div className="input-field">
											<form action={"http://"+ip+"/users/logout"} method="POST">
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
									<form action={"http://"+ip+"/users/logout"} method="POST">
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


//the Parent of all elements below, this will handle any properties that
//must be passed to the children
var Content = React.createClass({
	//the doneEdit event triggers when the user hits done editing on the proile page
	doneEdit: function(){
		console.log("done editing");
		if(document.getElementById('profilePicInput').value !== "")	{
			this.setState({profileURL: document.getElementById('profilePicInput').value});
			var myImage = new Image(100,100);
			myImage.src = document.getElementById('profilePicInput').value;
		}
		else document.getElementById('profilePicInput').value = "default";
		if(document.getElementById('profileName').value !== "") this.setState({custName: document.getElementById('profileName').value})
		else document.getElementById('profileName').value = this.state.custName;
		this.setState({desc: document.getElementById('description').value},function(){
			//puts the original panel on the left with the new vaues
			submitForm(myImage);
			this.setState({mode: "standard"});
		});
	},//edit mode will activate the edit profile settings and allow for in line editing
	editMode: function(){
		//changes the aside to an editable version
		console.log("entering edit mode");
		this.setState({mode: "edit"});
	},
	followEvent: function(){
		submitfollow();
	},
	loadPostsFromServer: function(){
		this.setState({followers: info[2]});
		this.setState({color: info[5]});
		this.setState({following: info[8]});
		this.setState({dat:data});
		this.setState({resultData: resultData});
		if(this.state.mode === "standard"){
			this.setState({profileSection: <ProfileInfo buttonClick={this.editMode} followClick={this.followEvent} myProfile={true} profileURL={this.state.profileURL} cust = {this.state.custName} posts={info[3]} followers={this.state.followers} following={this.state.following} desc={this.state.desc} />});
		}else if(this.state.mode === "edit"){
			this.setState({profileSection: <EditProfileInfo buttonClick={this.doneEdit} followClick={this.followEvent} myProfile={true} profileURL={this.state.profileURL} cust={this.state.custName} posts={info[3]} followers={this.state.followers} following={this.state.following} desc={this.state.desc} />});
		}
		handleResize();
	},//getInitialState will run when the component first loads and will initialize part of its state
	getInitialState: function() {
		cust = "ral";
		//change the profile picture to match the database
		if(info[4]==="default"){
			info[4] = "../design/no-profile-img.gif";
		}
    	return ({profileSection:<ProfileInfo buttonClick={this.editMode} followClick={this.followEvent} myProfile={true} profileURL={info[4]} cust={info[0]} posts={info[3]} followers={info[2]} following={info[8]} desc={info[9]}/>})
  	},
  	//componentDidMount will run at every rerender and will read info from server
	componentDidMount: function(){
		setInterval(this.loadPostsFromServer, this.props.pollInterval);
	},
	componentWillMount: function(){
		//remap the data from the server to react states
		this.setState({custName: info[0]});
		this.setState({followers: info[2]});
		this.setState({profileURL: info[4]});
		this.setState({color: info[5]});
		this.setState({logged: info[7]});
		this.setState({following: info[8]});
		this.setState({desc: info[9]});
		this.setState({resultData: resultData});
		//maintain none server variables
		getPost(info[0]); //get the information from the successcall
		this.setState({dat:data}); //this is the post data, it is currently just a stand-in
		this.setState({mode: "standard"}); //this is the aside type(standard is normal, edit is for edit mode)
	},
	//render will recreate the components and everything thatis on the screen starts here
	render: function(){
		return(
			<div className = "profilePage">
				<Navbar cust = {this.state.logged} color={this.state.color} data={this.state.resultData}/>
				{this.state.profileSection}
				<VidList data={this.state.dat} likes="3" reposts="2" shares="0" comments="0"/>
				<div className="fixed-action-btn" id="buttonOptions">
				    <a className="btn-floating btn-large red">
				      <i className="large material-icons">navigation</i>
				    </a>
				    <ul>
				      <li><a className="btn-floating red" onClick={this.editMode}><i className="material-icons">settings</i></a></li>
				      <li><a href={"http://"+ip+"/users/video"}className="btn-floating yellow darken-1"><i className="material-icons">videocam</i></a></li>
				      <li><a href={"http://"+ip+"/"+info[7]}className="btn-floating green"><i className="material-icons">person_pin</i></a></li>
				      <li><a href="#" className="btn-floating blue">Top</a></li>
				    </ul>
				</div>
			</div>
		);
	}
});


//the root this calls the parent with some dummy data
React.render(
	<Content pollInterval={200} resultData={resultData}/>,
	document.getElementById("content")
);



/********************
*     AJAX CALLS    *
********************/

//get videolist
function getPost(name){
	$.ajax({
		url: "http://"+ip+"/users/loadVideos?userName="+name,
		type: 'GET',
		success: function(response){
			//user has posted something
			console.log(response);
			data.unshift(response.videos[0]);
			console.log(data);
			if(response.length===0){
				console.log("nothing Returned");
			}
		},error: function(response){
			//user hasn't posted anything
			console.log("failed");
			console.log(response);
		}
	});
	return false;
};

//refresh page information
function refreshInfo(){
	console.log(info[7]);
	console.log(info[0]);
      $.ajax({
      url: "http://"+ip+"/",
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
};

//the elastic search query
function getSearch(){
	var value = document.getElementById("navSearch").value;
	console.log("value in search Field: "+value);
	resultData = [];
	$.ajax({
		url: "http://"+ip+"/users/searchName?search="+value,
		type: 'GET',
		success: function(response){
			console.log("successful response was");
			console.log(response);
			for(var i = 0; i<response.length;i++){
				console.log(response[i].fields);
				resultData.unshift(response[i].fields);
				console.log(resultData);
			}
		},
      	error: function(response){
	      	console.log(response);
	        alert('not successful ' + {response});
      }
	});
	return false;
}

//below is the update for follow press
function submitfollow(){
	console.log(info[7]);
	console.log(info[0]);
      $.ajax({
      url: "http://"+ip+"/users/follow",
      type: 'POST',
      data: {userName:info[1]},
      success: function(response){
      	//ensure the user is logged in
      	if(response["message"] === "not logged in!"){
	    	$(document).attr('location').href='/';
	    }else{
	    	//if they are logged in finish recieving data
      		console.log(info[2]);
        	if(response["message"].length < 40){
          		Materialize.toast(response.message,10000);
          		info[2] = response["followers"];
        	}
        	console.log(info[2])
        }
      },
      error: function(response){
      	console.log(response);
        alert('not successful ' + {response});
      }
    });
    return false;
};

//below is the update for profile information
var submitForm = function(myImage){
	var data =  $("#profileForm").serialize();
	setTimeout(function(){
		console.log("started Submition");
		try{
			//attampt to recieve the image color
			var colorThief= new ColorThief();
			var mainColor = colorThief.getColor(myImage);
			data = data+'&colour=rgb('+mainColor+')';
			info[5] = 'rgb('+mainColor+')';
		}catch(err){
			console.log("could not load image");
			data = data+'&colour='+info[5];
		}
		console.log(data);
	    $.ajax({
	      url: "http://"+ip+"/users/updateProfile",
	      type: 'POST',
	      data: data,
	      success: function(response){
	      	//ensure the user is logged in
	      	if(response === "not logged in!"){
	      		$(document).attr('location').href='/';
	      	}else{
	        	if(response.length < 40){
		          	Materialize.toast(response,5000);
	        	}else{

	        	}
	        }
	      },
	      error: function(response){
	        //alert('not successful ' + {response});
	      }
	    });
	    return false;
	},300);
};

//below is the ajax post for the edit button form
$('#modalForm').submit(function(){
      $.ajax({
      url: "http://"+ip+"/users/login",
      type: 'POST',
      data: $('#modalForm').serialize(),
      success: function(response){
        if(response.length < 40){
          Materialize.toast(response,10000);
        }else{
        }
      },
      error: function(response){
        //alert('not successful ' + {response});
      }
    });
    return false;
});

/********************
*     Javascript    *
********************/

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
     hover: false, // Activate on hover
     gutter: 1000, // Spacing from edge
     belowOrigin: true // Displays dropdown below the button
   }
 );

//base conversion for blob trabsfer
function base64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'video/webm';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

//monitors screen resize
$(window).resize(function(){
	handleResize();
});

//checks for document loading
$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.modal-trigger').leanModal();
	console.log("color is: " + info[5]);
    console.log("cookie: " + document.cookie);
	handleResize();
})
