//The father of the other parts
var Content = React.createClass({
	componentDidMount: function(){

	},
	render: function(){
		return(
			<div className="content">
				<form id = "registration" className="form">
		          <div className="row">
		            <div className="input-field col s12">
		              <input type="text" id="username" name="username" /><br/>
		              <label htmlFor="userName" data-error="">User Name</label>
		            </div>
		          </div>
		          <div className="row">
		            <div className="input-field col s12">
		              <input type="text" id="email" name="email"/><br/>
		              <label htmlFor="email">Email</label>
		            </div>
		          </div>
		          <div className="row">
		            <div className="input-field col s12">
		              <button className="btn waves-effect waves-light" type="submit" name="action" id="regButton">Register</button>
		            </div>
		          </div>
	          </form>
			</div>
		);
	}
});

//Beggining of the react engine
React.render(
	<Content pollInterval={200} />,
	document.getElementById("content")
);

/************************
* Ajax Calls            *
************************/

$('#registration').submit(function(){
      $.ajax({
      url: "http://"+ip+"/users/registerFacebook",
      type: 'POST',
      data: $('#registration').serialize(),
      success: function(response){
        console.log(response);
        Materialize.toast(response,10000);
        if(response.length < 100 && response.length > 30){//if both email and usrename fail
          $('#email').css("border-color","red");
          $('#Username').css("border-color","red");
        }else if(response.substring(0,4) === "Emai"){//if only email is taken
          $('#email').css("border-color","red");
          $('#Username').css("border-color","#9E9E9E");
        }else if(response.substring(0,4) === "User"){//if only user is taken
          $('#email').css("border-color","#9E9E9E");
          $('#Username').css("border-color","red");
        }else if(response == "Success!"){
          console.log("changing location");
          $(document).attr('location').href='/'; //if everything is fine
        }
      },
      error: function(response){
        console.log('not successful ' + {response});
      }
    });
    return false;
});