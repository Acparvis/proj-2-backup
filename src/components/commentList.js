import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PostComment from './postComment';
import NewComment from './newComment';

import {
	fetchPosts,
	voteDetail,
	deletePost

} from "../data/actions/state";

const mapStateToProps = state => {
	let posts = state.get("posts");

	return {
		posts: posts,
	}
};

const mapDispatchToProps = dispatch => ({
	voteUp: (id) => dispatch(voteDetail(id, "up")),
	voteDown: (id) => dispatch(voteDetail(id, "down")),
	postDelete: (id) => dispatch(deletePost(id))

});

class CommentList extends Component {

	componentDidMount(){

	}

	render() {
    return (
			<div className="post-container">
			<NewComment />
	      <h1>Comment List</h1>

				{this.props.data.length > 0 ? this.props.data.map((post, i) => {
					return <PostComment key={i} data={this.props.data[i]}/>

				}) : <h1>No Comments</h1> }



			</div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);



// Listed posts are displayed with the following:
// 1) Title
// 2) Author
// 3) Number of comments
// 4) Current score
// 5) Voting mechanism to upvote or downvote the post
// 6) Buttons or links for editing or deleting that post
