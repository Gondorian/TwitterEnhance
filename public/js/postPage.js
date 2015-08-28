var ip = "192.168.2.19:3000";
//var ip = "104.131.218.159";

var callOrder = [] //This is the order that video parts should be called in
var recording = false; //wether the video is currently being recorded
var currentCanvas = 0; //The number of clips shown in timeline
var updatingCanvas; //The current canvas updating in timeline
var canvasList = []; //The list of jSON for video data in the timeline
var startRecording; //The time the video began recordeing
var viewDepth = 0; //this represents the current panel on the stack
//List of filters
var FilterList = React.createClass({
	render: function(){
		return(
			<div className="row filters vidSection">
				<ul className="filterList">
					<li id="undefined" className="filter"><p>None</p></li>
					<li id="blur" className="filter"><p>Blur</p></li>
					<li id="brighten" className="filter"><p>Brighten</p></li>
					<li id="color" className="filter"><p>Color</p></li>
					<li id="contrast" className="filter"><p>Contrast</p></li>
					<li id="darken" className="filter"><p>Darken</p></li>
					<li id="depth" className="filter"><p>Depth</p></li>
					<li id="grayscale" className="filter"><p>Grayscale</p></li>
					<li id="sharpen" className="filter"><p>Sharpen</p></li>
					<li id="threshold" className="filter"><p>Threshold</p></li>
					<li id="tint" className="filter"><p>Tint</p></li>
				</ul>
			</div>
		);
	}
})

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
			<li className="ui-state-default">
				<canvas id={this.props.keys} ref="vidCanvas" className="part"></canvas>
			</li>
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
				<CanvasPart key={canvas.key} keys={canvas.key}/>
			);
		});
		return(
			<div className="videoPart">
				<ul id="sortable">
					{canvasNodes}
				</ul>
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
			document.getElementById("record").style.color = "#8B0000";
			//add location to canvas list
		}else {
			recording = false;
			updatingCanvas = "";
			//update canvas list to have the correct information
			canvasList[currentCanvas].startTime = startRecording;
			canvasList[currentCanvas].endTime = v.currentTime;
			canvasList[currentCanvas].key = currentCanvas;
			//modify the call order to include the new item and move to next canvas
			callOrder[currentCanvas]=currentCanvas;
			console.log(canvasList);
			currentCanvas++;
			document.getElementById("record").style.color = "white";
		}
	},
	render: function(){
		return(
			<div className="vidSection" id="vidSection">
				<div className="video">
					<canvas id="vidCanvas" onClick={playPause}></canvas>
					<video id="video" >
						<source id="source" src="../design/BigBuckBunny.mp4" type="video/mp4" />
					</video>
					<div className="controller">
						<div>
							<progress id="vidProgress" value="0" max="100"> </progress>
						</div>
						<div className="Controls">
							<div className="leftControls">
								<a title="Play" id="play" className="" onClick={this.playClick}><i className="mdi-av-play-arrow"></i></a>
								<a title="Record" id="record" className="" onClick={this.recordClick}><i className="mdi-image-brightness-1"></i></a>
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
					<progress id="timeline" value="0" max="2250"></progress>
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

//The bar along the top that asks for the file
var FilePicker = React.createClass({
	clicked: function(){
		var x = document.getElementById("myfile").files;
		console.log(x[0]);
		document.getElementById("source").src="../design/"+x[0].name;
		video.load();
		video.play();
		playButton.getElementsByTagName("i")[0].className=("mdi-av-pause");
	},
	render: function(){
		return(
			<div className="vidSection">
				<img className="image" src="http://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/System-documents-icon.png" alt="Enter Document below" height="200" width="200"> </img>
				<p className="textField">Chose Document Below </p>
				<form id="selector">
					<input id="myfile" type="file" />
					<a href="#" onClick={this.clicked}> submit </a>
				</ form>
			</div>
		);
	}
})

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
		playback = true;
		timer();
		video.play(); //start playing for the render
	},
	submitClick: function(){
		//compile the video and send to the server, send to filters page
	},
	nextClick: function(){
		//the navigation button was clicked for the next page to come in
		if(viewDepth > 1) return;
		$(".section:eq("+viewDepth+")").addClass("offScreen");
		viewDepth++;
	},
	lastClick: function(){
		//the navigation button was clicked or the last page to come in
		if(viewDepth < 1) return;
		viewDepth--;
		$(".section:eq("+viewDepth+")").removeClass("offScreen");
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
				<a onClick={this.lastClick} className="btn-flat waves-light navButton" id="leftPan"><i htmlFor="leftPan" className="image-navigate-before"> &lt; </i></a>
				<a onClick={this.nextClick} className="btn-flat waves-light navButton" id="rightPan"><i htmlFor="rightPan" className="image-navigate-next"> &gt; </i></a>
				<div className="section" id="fileSection">
					<FilePicker />
				</div>
				<div className="section" id="renderSection">
					<Video canvasList={this.state.canvasList} viewClick={this.viewClick}/>
					<FilterList />
				</div>
				<div className="section">
    				<video id="awesome" width="500" height="500" controls loop src=""></video>
    				<div className="vidSection">
    					<a id="twitter" href="https://twitter.com/intent/tweet?text='A video posted from Video45' via @'travis' &url=http://video45.com " className="social btn-flat"><i className="fa fa-twitter"></i></a>
						<a id="facebook" href="https://www.facebook.com/sharer/sharer.php?u=http://video45.com" className="social btn-flat"><i className="fa fa-facebook"></i></a>
						<a id="google" href="https://plus.google.com/share?url=http://video45.com" className="social btn-flat"><i className="fa fa-google-plus"></i></a>
					</div>
				</div>
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
var finalVideo = new Whammy.Video(50);
var filter;
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;
canvas.width = cw;
canvas.height = ch;
var frame = 0;

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
	playButton.getElementsByTagName("i")[0].className=("mdi-av-pause");
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

//set the filter to the clicked filters id
$('.filter').on("click",function(){
	video.pause();
	var filterName = $(this).attr('id');
	filter = filterName;
	setTimeout(function(){video.play();},20);
	playButton.getElementsByTagName("i")[0].className=("mdi-av-pause");
});

var playback = false;
//Function is called when view is clicked
function watchEdit(){
	//change video to edited video and start from the beginning
	//load symbol should appear ontop of video
	if(!recording){
		playback = true;
		var wait = 0;
		for(var i=0;i<canvasList.length;i++){
			//check each section for change
			if(frame*0.02>wait&&frame*0.02<=wait+0.02){
				console.log("changing video location");
				video.currentTime = canvasList[callOrder[i]].startTime;
			}
			wait = wait+canvasList[callOrder[i]].endTime-canvasList[callOrder[i]].startTime;
		}
		//waits until video is done with playback
		checkEnd(wait);
	}else{alert("Please stop recording before viewing");}
}

function checkEnd(wait){
	console.log("wait " + wait + " frame: "+frame);
	if(frame*0.02>wait){
		//stop rendering video
		console.log("creating final version");
		//pause the video when finis
		playback = false;
		setTimeout(function(){
			//finalize the video
			var output = finalVideo.compile();
			var url = webkitURL.createObjectURL(output);
			document.getElementById('awesome').src = url;
			document.getElementById('link').innerHTML = url;
			video.pause();
		},10000)
	}
}

//This controls the blue progress bar tha lies overtop the canvas list
function timer(){
	//sets a 50th of a second timeout
	setTimeout(function(){
		//console.log(runTime);
		if(!playback){
			if(v.paused||v.ended) return false;
		}
		if(playback === true){
			//this will be run every half second
			var width = frame;
		 	$("#timeline").val( Math.max(0,frame));
			timer();
			return false;
		}
	},20);
}

//canvas drawing
$('#video').on("play",function(){
	console.log("video playing");
	var can = this;
	draw(can,context,cw,ch,filter);
});

//add a filter to the canvas object
function filterdata(idata, type){
	switch(type){
		//applys grey tint to canvas
		case "grayscale":
			var data= idata.data;
			for(var i = 0; i< data.length; i+=4){
				var r= data[i];
				var g = data[i+1];
				var b = data[i+2];
				var brightness = 0.2126*r + 0.7152*g + 0.0722*b;
				data[i]=brightness;
				data[i+1]=brightness;
				data[i+2]=brightness;
			}
			idata.data = data;
			return idata;
		  break;
		case "brighten":
			var adjustment = 30;
			var data = idata.data;
			for(var i=0;i<data.length;i+=4){
				data[i] += adjustment;
				data[i+1] += adjustment;
				data[i+2] += adjustment;
			}
			return idata;
		  break;
		case "threshold":
			var data = idata.data;
			var threshold = 160;
			for(var i=0; i< data.length; i+=4){
				var r = data[i];
				var g = data[i+1];
				var b = data[i+2];
				var brightness = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255:0;
				data[i] = data[i+1] = data[i+2] = brightness
			}
			return idata;
		  break;
		case "sharpen":
			idata = convulute(idata,[0,-1,0,-1,5,-1,0,-1,0],1);
			return idata;
		  break;
		case "blur":
			idata = convulute(idata,[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],1);
			return idata;
		  break;
		case "depth":
			idata = convulute(idata,[1,1,1,1,0.7,-1,-1,-1,-1],1);
			return idata;
		  break;
		case "darken":
			var adjustment = -30;
			var data = idata.data;
			for(var i=0;i<data.length;i+=4){
				data[i] += adjustment;
				data[i+1] += adjustment;
				data[i+2] += adjustment;
			}
			return idata;
		  break;
		case "contrast":
			return idata
		  break;
		case "color":
			var data=idata.data;
			for(var i=0;i<data.length;i+=4){
				data[i] = 0;
			}
			idata.data = data;
			return idata;
		  break;
		case "tint":
			var data = idata.data;
			for(var i=0;i<data.length;i+=4){
				var average = (data[i] +data[i+1] +data[i+2]) /3;
				data[i] = average;
				data[i+1] = average+30;
				data[i+2] = average;
			}
			idata.data = data;
			return idata;
		  break;
		default:
			return idata;
	}
}

//this creates a convulution matrix for different types of filters.w
var convulute = function(pixels, weights, opaque){
	//used for temporary matrix convulution before placing on main canvas
	var tmpCanvas = document.createElement('canvas');
	var tmpCtx = tmpCanvas.getContext('2d');
	var side = Math.round(Math.sqrt(weights.length));
	var halfSide = Math.floor(side/2);
	var src = pixels.data;
	var sw = pixels.width;
	var sh = pixels.height;

	var w = sw;
	var h = sh;
	var output = tmpCtx.getImageData(0,0,w,h);
	var dst = output.data;
	//look through pixels in matrix
	var alphaFac = opaque ? 1:0;
	for(var y=0;y<h;y++){
		for (var x=0; x<w;x++){
			var sy = y;
			var sx = x;
			var dstOff = (y*w+x)*4;
			//matrix calculation for convolution matrix
			var r=0, g=0, b=0, a=0;
			for (var cy=0; cy<side; cy++){
				for (var cx=0; cx<side;cx++){
					var scy = sy+cy-halfSide;
					var scx = sx +cx - halfSide
					if(scy >= 0 && scy < sh && scx >=0 && scx < sw){
						var srcOff = (scy*sw+scx)*4;
						var wt = weights[cy*side+cx];
						r += src[srcOff] * wt;
						g += src[srcOff+1] * wt;
						b += src[srcOff+2] * wt;
						a += src[srcOff+3] * wt;
					}
				}
			}
			dst[dstOff] = r;
			dst[dstOff+1] = g;
			dst[dstOff+2] = b;
			dst[dstOff+3] = a +alphaFac*(255-a);
		}
	}
	return output;
}

//acts as a buffer for context information
function renderFrame(context, frame){
	console.log("saving frame" + frame);
	finalVideo.add(context);
}

//draw an image onto the canvas
function draw(v,c,w,h,filter){
	v.play();
	if(!playback){
		if(v.paused||v.ended) return false;
	}
	c.drawImage(v,0,0,w,h);
	//console.log("count");

	if (typeof filter === 'undefined'){
	}else{
		var idata = c.getImageData(0,0,w,h);
		newdata = filterdata(idata,filter);
		c.putImageData(newdata,0,0);
	}
		//Creates the video from the canvas
	if(playback){
		v.pause();
		frame++;
		setTimeout(renderFrame, 10000, c, frame);
		watchEdit();
		//video.currentTime = video.currentTime+.02;
		setTimeout(draw,20,v,c,w,h,filter); //recall this function
	}else{
		setTimeout(draw,20,v,c,w,h,filter); //every 20 milliseconds(50fps) redraw the canvas
	}
}


$(document).ready(function(){
	//get parts of materialize to function correctly
	$(".button-collapse").sideNav();
	$('.modal-trigger').leanModal();

	//below is for the drag effect on the canvas
	$("#sortable").sortable({
		stop: function(){
			//loops through each image to find the new positioning for the JSON list
			$.each($('.part'),function(key, value){
				console.log(value.id);
				callOrder[key] = value.id;
			})
			console.log(callOrder);
		},
		revert: false
	});
	$("#draggable").draggable({
		connectToSortable: "#sortable",
		helper: "clone",
		revert: "invalid"
	});
	$("ul, li").disableSelection();
});