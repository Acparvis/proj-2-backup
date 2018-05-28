import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import {
	fetchPosts,
	vote,
	deletePost,
	editPost

} from "../data/actions/state";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const mapStateToProps = state => {
	let posts = state.get("posts");

	return {
		posts: posts,
	}
};

const mapDispatchToProps = dispatch => ({
	voteUp: (id) => dispatch(vote(id, "up")),
	voteDown: (id) => dispatch(vote(id, "down")),
	postDelete: (id) => dispatch(deletePost(id)),
	postEdit: (value) => dispatch(editPost(value))
});

class Post extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      modalIsOpen: false,
				title: this.props.data.title,
				body: this.props.data.body,
				id: this.props.data.id,
	    };

			this.handleBody = this.handleBody.bind(this);
			this.handleTitle = this.handleTitle.bind(this);
	    this.openModal = this.openModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  openModal() {
	    this.setState({modalIsOpen: true});
	  }

	  closeModal() {
	    this.setState({modalIsOpen: false});
	  }

		handleTitle(event) {
			this.setState({title: event.target.value});
		}

		handleBody(event) {
			this.setState({body: event.target.value});
		}

		handleSubmit(event) {
			event.preventDefault();
			this.props.postEdit(this.state)
		}

	render() {
    return (
			<div className="post-container">
	      <Link to={`/${this.props.data.category}/${this.props.data.id}`}>Title: {this.props.data.title}</Link>
				<h2>Body: {this.props.data.body}</h2>
				<h2>Author: {this.props.data.author}</h2>
				<h2>Number of Comments: {this.props.data.commentCount}</h2>
				<h2>Current Score: {this.props.data.voteScore}</h2>
				<button onClick={ () => this.props.voteUp(this.props.data.id)}>Upvote</button>
				<button onClick={ () => this.props.voteDown(this.props.data.id)}>Downvote</button>

				<h2>Category: {this.props.data.category}</h2>

				<button onClick={this.openModal}>Edit</button>
				<button onClick={ () => this.props.postDelete(this.props.data.id)}>Delete</button>



				<Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Comment"
        >

					<form className="form-container" onSubmit={this.handleSubmit}>
					<label>Post Title</label>
						<input type="text" defaultValue={this.props.data.title} onChange={this.handleTitle} />
					<label>Post Body</label>
						<input type="textarea" defaultValue={this.props.data.body} onChange={this.handleBody} />
						<input type="submit" value="Submit" />          <button onClick={this.closeModal}>close</button>
          </form>
        </Modal>
			</div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Post);



// Listed posts are displayed with the following:
// 1) Title
// 2) Author
// 3) Number of comments
// 4) Current score
// 5) Voting mechanism to upvote or downvote the post
// 6) Buttons or links for editing or deleting that post
