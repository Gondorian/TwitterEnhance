var ip = "192.168.2.19:3000";
//var ip = "104.131.218.159";

var recording = false;
var currentCanvas = 0;
var updatingCanvas;
var canvasList = []
var startRecording;

//This is for the images in the timeline
var CanvasPart = React.createClass({
	componentDidMount: function(){
		//called when a new canvas comes into the timeline
		console.log("canvas loaded");
		updatingCanvas = React.findDOMNode(this.refs.vidCanvas);
		var context = updatingCanvas.getContext("2d");
		//log the time upon creation
		startRecording = v.currentTime;
		context.drawImage(v,0,0);
	},
	render: function(){
		return (
			<canvas ref="vidCanvas" className="part"></canvas>
		);
	}
});

//this creates new parts when they are added
var VideoPart = React.createClass({
	canvasMade: function(){
		console.log("canvas loaded");
		updatingCanvas = React.findDOMNode(this.refs.vidCanvas);
		var context = updatingCanvas.getContext("2d");
		startRecording = v.currentTime;

		context.drawImage(v,0,0);
	},
	render: function(){
		var canvasNodes = this.props.canvasList.map(function(canvas){
			return(
				<CanvasPart />
			);
		});
		return(
			<div className="videoPart">
				{canvasNodes}
			</div>
		);
	}
});

var Video = React.createClass({
	recordClick: function(){
		console.log("record clicked");
		if(!recording){
			recording = true;
			canvasList.push({key: currentCanvas})
			//add location to canvas list
		}else {
			recording = false;
			updatingCanvas = "";
			//update canvas list to have the correct information
			canvasList[currentCanvas].startTime = startRecording;
			canvasList[currentCanvas].endTime = v.currentTime;
			canvasList[currentCanvas].key = currentCanvas;
			console.log(canvasList);
			currentCanvas++;
		}
	},
	render: function(){
		return(
			<div className="vidSection" id="vidSection">
				<div className="video">
					<canvas id="vidCanvas" onClick={playPause}></canvas>
					<video id="video" >
						<source src="../design/BigBuckBunny.mp4" type="video/mp4" />
					</video>
					<div className="controller">
						<div>
							<progress id="vidProgress" value="0" max="100"> </progress>
						</div>
						<div className="Controls">
							<div className="leftControls">
								<a id="play" className="" onClick={this.playClick}><i className="mdi-av-play-arrow"></i></a>
								<a id="record" className="" onClick={this.recordClick}><i className="mdi-image-brightness-1"></i></a>
								<a id="sound" className=""><i className="mdi-av-volume-up" /></a>
								<input type="range" id="volumeControl" defaultValue="100" />
							</div>
							<div className="time">
								<label id="label" className="contorols">00:00</label>
							</div>
						</div>
						<div className="rightControls">

						</div>
					</div>
				</div>
				<div className="timeline">
					<progress id="timeline" value="0" max="450"></progress>
					<VideoPart canvasList={this.props.canvasList} />
				</div>
				<div className="buttons row">
					<a className="col s3 btn waves-light orange" onClick={this.props.viewClick}> View </a>
					<a className="col s3 offset-s6 btn waves-light blue"> Submit </a>
				</div>
			</div>
		);
	}
});

//creates the standard navbar for the website
var Navbar = React.createClass({
	render: function(){
		return(
			<div  className="navbar-fixed">
				<nav>
					<div className = "nav-wrapper">
						<a href='#' className="brand-logo"></a>
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
								<a id="profileBut" className='btn-floating' href={"/users/"}><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href={"/users/"+'/post'} >profilePage</a></li>
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

//The father of the other parts
var Content = React.createClass({
	timeLineClick: function(){
		//update page for view setting and start video from clicked position
		//load symbol should appear ontop of video untill video load
	},
	viewClick: function(){
		console.log("view was clicked ")
		watchEdit();
	},
	submitClick: function(){
		//compile the video and send to the server, send to filters page
	},
	updater:function(){
		this.setState({canvasList:canvasList});
	},
	componentDidMount: function(){
		setInterval(this.updater, this.props.pollInterval);
	},
	getInitialState: function(){
		return({canvasList: canvasList});
	},
	render: function(){
		return(
			<div className="content">
				<Navbar />
				<Video canvasList={this.state.canvasList} viewClick={this.viewClick}/>
			</div>
		);
	}
});

//Beggining of the react engine
React.render(
	<Content pollInterval={200} />,
	document.getElementById("content")
);


/*****************
*    AJAX Calls  *
*****************/
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


/*****************
*   Javascript   *
*****************/
//video and canvas information
var v = document.getElementById('video');
var canvas = document.getElementById('vidCanvas');
var context = canvas.getContext('2d');
var filter;
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;
canvas.width = cw;
canvas.height = ch;

//video buttons
var playButton = document.getElementById("play");
var seekBar = document.getElementById("vidProgress");
var muteButton = document.getElementById("sound");
var volumeBar = document.getElementById("volumeControl");
var mutedVolume = 0;

playButton.addEventListener("click",playPause);

function playPause(){
	if(video.paused == true) {
		//play the video if it was paused
		video.play();
		//update the icon on the button
		playButton.getElementsByTagName("i")[0].className=("mdi-av-pause");
	}else {
		//pause the video
		video.pause();

		//update the icon on the button
		playButton.getElementsByTagName("i")[0].className=("mdi-av-play-arrow");
	}
}

video.addEventListener("timeupdate", function() {
	//calculate the slider value
	var current = v.currentTime;
	var value = parseInt((current/video.duration)*100);

	//handle the canvas settings based on recording length
	if(recording){
		if(updatingCanvas!==undefined&& updatingCanvas!==""){
			var width = ($("#vidProgress").width()*(current-startRecording))/45;
			updatingCanvas.style.width = Math.max(0,width)+'px';
		}
	}

	//update the slider value
	seekBar.value = value;
	var minutes = Math.floor(current/60);
	var seconds = parseInt(current%60);
	if(minutes<10) {minutes = "0"+minutes;}
	if(seconds<10) {seconds = "0"+seconds;}
	document.getElementById("label").innerHTML=minutes+':'+seconds;
})

// Pause the video when the seek handle is being dragged
seekBar.addEventListener("mousedown", function() {

});

// Play the video when the seek handle is dropped
seekBar.addEventListener("mouseup", function() {
	if(recording){
		recording = false; // turn off the recording
		//update canvas list to have the correct information
		canvasList[currentCanvas].startTime = startRecording;
		canvasList[currentCanvas].endTime = v.currentTime;
		canvasList[currentCanvas].key = currentCanvas;
		console.log(canvasList[currentCanvas]);
		currentCanvas++;
	}
	//get the mouse click position relative to the side of the element
	var offset = $(this).offset();
  	var relativeX = (event.pageX - offset.left);
  	var width = $("#vidProgress").width();
  	var newTime = (relativeX/width)
  	console.log(newTime);
	// Calculate the new time
	var time = video.duration * newTime;
	//set the value on the progress bar to correct location
	document.getElementById("vidProgress").value=newTime*100;
	// Update the video time
	video.currentTime = time;
	video.play();
});

// Event listener for the mute button
muteButton.addEventListener("click", function() {
	if (video.muted == false) {
		// Mute the video
		video.muted = true;

		mutedVolume = volumeBar.value
		console.log(volumeBar.value);
		console.log(mutedVolume);
		volumeBar.value = 0;
		// Update the button text
		muteButton.getElementsByTagName("i")[0].className=("mdi-av-volume-off");
	} else {
		// Unmute the video
		video.muted = false;

		volumeBar.value = mutedVolume;
		video.volume=volumeBar.value/100;
		// Update the button text
		muteButton.getElementsByTagName("i")[0].className=("mdi-av-volume-up");
	}
});


//update the sound of the video if the mouse is over the sound
volumeBar.addEventListener("mousemove", volumeSetting);
function volumeSetting(){
	// Update the video volume
	video.volume = volumeBar.value/100;
	if(volumeBar.value < 5){
		muteButton.getElementsByTagName("i")[0].className=("mdi-av-volume-off");
	}else{
		muteButton.getElementsByTagName("i")[0].className=("mdi-av-volume-up");
	}
}

var runTime;
var playback = false;
function watchEdit(){
	//change video to edited video and start from the beginning
	//load symbol should appear ontop of video
	video.play();
	runTime = 0;
	console.log(canvasList);
	if(!recording){
		playback = true;
		timer();
		var wait = 0;
		for(var i=0;i<canvasList.length;i++){
			//create the timeOuts for each part
			doSetTimeout(i, wait);
			console.log("wait: " + wait);
			wait = wait+canvasList[i].endTime-canvasList[i].startTime;
		}
		//waits until video is done with playback
		setTimeout(function(){
			//pause the video when finished
			playback = false;
			video.pause();
		},wait*1000);
	}else{alert("Please stop recording before viewing");}
}

//allows the timeout to function without a run on the memory
function doSetTimeout(i, wait){
	setTimeout(function(){
		console.log("changing location");
		video.currentTime = canvasList[i].startTime;

		return false;
	},wait*1000);
}

function timer(){
	//sets a half second timeout
	setTimeout(function(){
		if(playback === true){
			//this will be run every half second
			var width = runTime;
			 $("#timeline").val( Math.max(0,width));
			runTime++;
			timer();
			return false;
		}
	},100)
}

//canvas drawing
$('video').on("play",function(){
	console.log("video playing");
	draw(this,context,cw,ch,filter);
});


//add a filter to the canvas object
function filterdata(idata, type){
	switch(type){
		//applys grey tint to canvas
		case "grey":
			var data= idata.data;
			for(var i = 0; i< data.length; i+=4){
				var r= data[i];
				var g = data[i+1];
				var b = data[i+2];
				var brightness = parseInt((r+g+b)/3);
				data[i]=brightness;
				data[i+1]=brightness;
				data[i+2]=brightness;
			}
			idata.data = data;
			return idata;
		  break;
		default:
			return idata;
	}
}

//draw an image onto the canvas
function draw(v,c,w,h,filter){
	if(v.paused||v.ended) return false;
	c.drawImage(v,0,0,w,h);

	if (typeof filter === 'undefined'){
	}else{
		var idata = c.getImageData(0,0,w,h);
		newdata = filterdata(idata,filter);
		c.putImageData(newdata,0,0);
	}
	setTimeout(draw,20,v,c,w,h,filter);
}

$(document).ready(function(){

});