import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link, Route} from 'react-router-dom';
import PostDetail from './postDetail';
import CommentList from './commentList';
import Controls from './controls'
import {withRouter} from 'react-router-dom';


import {
	fetchPosts,
	viewPostUpdate,
	viewPostComments,

} from "../data/actions/state";


const mapStateToProps = state => {
	let post = state.get("detailPost");
	let comments = state.get("detailPostComments")

	return {
		post: post,
		comments: comments,
	}
};

const mapDispatchToProps = dispatch => ({
	postsFetch: () => dispatch(fetchPosts()),
	postView: (id) => dispatch(viewPostUpdate(id)),
	commentsView: (id) => dispatch(viewPostComments(id))

});

class ViewPostPage extends Component {

	componentWillMount(){
			this.props.postView(window.location.pathname.split('/')[2])
			this.props.commentsView(window.location.pathname.split('/')[2])
	}


	render() {
		if (!this.props.post.category){
			return (<div>
				<Controls />
				<h1>404 Post Not Found</h1>
			</div>)
		} else {
    return (
				<div>
					<Link to={'/'}>Go Back</Link>
					<PostDetail data={this.props.post}/>
					<CommentList data={this.props.comments}/>

				</div>


    );
  }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage);
