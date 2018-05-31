import React, { Component } from 'react';
import { connect } from "react-redux";

import {
	fetchPosts,
	fetchCategories,
	updatePosts

} from "../data/actions/state";

import Post from './post';

const mapStateToProps = state => {
	let posts = state.get("posts");

	return {
		posts: posts,
	}
};

const mapDispatchToProps = dispatch => ({
	postsFetch: () => dispatch(fetchPosts()),
	categoryFetch: () => dispatch(fetchCategories()),
	postsUpdate: (value) => dispatch(updatePosts(value))
});

class PostList extends Component {

	componentWillMount(){
			this.props.postsFetch()
			this.props.categoryFetch()
	}

	componentDidMount(){
		this.props.postsFetch()
	}

	render() {
		if(this.props.extra){
			return (
				<div>
						{this.props.posts.length > 0 ?  this.props.posts.filter((post) => {
							return this.props.extra.match.params.category == post.category;
						}).map((post, i) => {
							return <Post key={i} data={post} />
						}) : <h1>no posts</h1>}
				</div>
	    );
		} else {
			return (
				<div>
					{this.props.posts.length > 0 ? this.props.posts.map((post, i) => {
						return <Post key={i} data={post} />
					})  : <h1>no posts</h1>}
				</div>
			);
		}

  }



}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
