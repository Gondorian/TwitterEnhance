/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var Comment = React.createClass({
  //renderer is used as call when this item is requested
  render: function() {
    //markup is the js used for modifing text inline
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    //the returnn the the modified html that is placed back into the index document
    return (
      //creates a div
      <div className="comment">
        //creates the other as a header
        <h2 className="commentAuthor">
          //asks for the authors name from the props(recieved from parent as argument)
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />//allows the markup to modify html tags
      </div>
    );
  }
});

//comment box section
var CommentBox = React.createClass({
  //calls information from the json file using ajax syntax
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //handels pushing the comment back into the json file during form submit
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  //when the box is first rendered do this
  getInitialState: function() {
    return {data: []};
  },
  //when the box is rendered run this
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  //when the box is rendered generate this html code
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

//comment list is a child of the comment box and has comments as children
var CommentList = React.createClass({
  render: function() {
    //creates data nodes and maps each comment to an index
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>//creates the comment class given the author name
          //then puts in the comment text
          {comment.text}
        </Comment>
      );
    });
    return (
      //puts out the comment list
      <div className="commentList">
        //sends the
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  //this is called when the form is submitted
  handleSubmit: function(e) {
    e.preventDefault();
    //creates variables and gives them the values from the two text inputs
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    //checks if either text input was empty and stops if either is
    if (!text || !author) {
      return;
    }
    //returns the values to the comment box
    this.props.onCommentSubmit({author: author, text: text});
    //searches for the DOM with the refs= author and sets its value to blank
    React.findDOMNode(this.refs.author).value = '';
    //searches for the DOM with the ref= text and sets it's value to blank
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      //creates a form that when is submitted calls the handle submit method, wich in turn call the comment box handle submit
      <form className="commentForm" onSubmit={this.handleSubmit}>
        //the ref states the name of the input component so that it can be found using react.find DOMNODE
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

//this is called when the page is rendered
React.render(
  //creates the comment box with the json information being polled every 2 seconds
  <CommentBox url="http://localhost:3000/" pollInterval={2000} />,
  //places the information into the div with the id content
  document.getElementById('content')
);
