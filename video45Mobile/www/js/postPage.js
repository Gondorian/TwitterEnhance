
var filters = React.createClass({
	render: function(){
		return(

		);
	}
});

var Video = React.createClass({
	render: function(){
		return(
			<div className="vidSection">
				<div className="video">
					<video></video>
				</div>
				<div className="controls">

				<div>
			</div>
			<div className="Timeline">

			</div>
		);
	}
});

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
								<a id="profileBut" className='btn-floating' href={"/users/"+info[7]}><i className="mdi-action-perm-identity left" /></a>
								<ul id="dropdown1" className='dropdown-content'>
									<li><a href={"/users/"+info[7]+'/post'} >profilePage</a></li>
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

var Content = React.createClass({
	render: function(){
		return(
			<Navbar />
			<Video />
			<filters />
		);
	}
});

React.render(
	<Content pollInterval={200} />,
	document.getElementById("content")
);