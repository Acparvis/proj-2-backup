import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment';

import {
	fetchPosts,
	voteComment,
	createComment2

} from "../data/actions/state";

const mapStateToProps = state => {
	let posts = state.get("posts");

	return {
		posts: posts,
	}
};

const mapDispatchToProps = dispatch => ({
	commentCreate: (value) => dispatch(createComment2(value)),

});


function guidGenerator() {
	var S4 = function() {
		 return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

class NewComment extends Component {


	constructor(props) {
		super(props);
		this.state = {
			body: '',
			author: '',
			timestamp: Date.now(),
			id: guidGenerator(),
			parentId: window.location.pathname.split('/')[2],
	};

		this.handleComment = this.handleComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAuthor = this.handleAuthor.bind(this);
	}

	handleComment(event) {
		this.setState({body: event.target.value});
	}

	handleAuthor(event) {
		this.setState({author: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ id: guidGenerator()})
		this.props.commentCreate(this.state);

	}



	render() {
		return (
			<div>
					<form className="form-container" onSubmit={this.handleSubmit}>
					<label>Comment</label>
						<input type="text" value={this.state.value} onChange={this.handleComment} />

						<label>Author</label>
						<input type="text" value={this.state.value} onChange={this.handleAuthor} />

						<input type="submit" value="Submit" />
					</form>
			</div>

		);
	}

}
export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
