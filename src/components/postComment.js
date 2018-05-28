import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import Modal from 'react-modal';

import {
	fetchPosts,
	voteComment,
	deleteComment,
	editComment

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
	voteUp: (id, parentId) => dispatch(voteComment(id, "up", parentId)),
	voteDown: (id, parentId) => dispatch(voteComment(id, "down", parentId)),
	commentDelete: (id, parentId) => dispatch(deleteComment(id, parentId)),
	commentEdit: (value) => dispatch(editComment(value))

});

// Modal.setAppElement('App')

class PostComment extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      modalIsOpen: false,
				body: this.props.data.body,
				id: this.props.data.id,
				timestamp: Date.now(),
				parentId: this.props.data.parentId
	    };

			this.handleComment = this.handleComment.bind(this);
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

		handleComment(event) {
			this.setState({body: event.target.value});
		}

		handleSubmit(event) {
			event.preventDefault();
			this.props.commentEdit(this.state);
			
		}


	render() {
    return (
			<div className="post-container">
	      <h3>Author: {this.props.data ? this.props.data.author : null}</h3>
				<h4>Body: {this.props.data ? this.props.data.body : null}</h4>
				<h4>Posted at: {this.props.data ? moment(this.props.data.timestap).format('LLL') : null}</h4>
				<h4>VoteScore: {this.props.data ? this.props.data.voteScore : null}</h4>

				<button onClick={(e) => this.props.voteUp(this.props.data.id, this.props.data.parentId)}>Upvote</button>
				<button onClick={(e) => this.props.voteDown(this.props.data.id, this.props.data.parentId)}>Downvote</button>

				<button onClick={(e) => this.props.commentDelete(this.props.data.id, this.props.data.parentId)}>Delete</button>

				<div>
        <button onClick={this.openModal}>Edit</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Comment"
        >

					<form className="form-container" onSubmit={this.handleSubmit}>
					<label>Comment</label>
						<input type="text" defaultValue={this.props.data.body} onChange={this.handleComment} />
						<input type="submit" value="Submit" />          <button onClick={this.closeModal}>close</button>
          </form>
        </Modal>
      </div>

			</div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(PostComment);



// Listed posts are displayed with the following:
// 1) Title
// 2) Author
// 3) Number of comments
// 4) Current score
// 5) Voting mechanism to upvote or downvote the post
// 6) Buttons or links for editing or deleting that post
