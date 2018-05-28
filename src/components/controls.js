import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

import {
	fetchPosts,

} from "../data/actions/state";



const mapStateToProps = state => {
	let posts = state.get("posts");

	return {
		posts: posts,
	}
};

const mapDispatchToProps = dispatch => ({
	postsFetch: () => dispatch(fetchPosts()),

});

class Controls extends Component {

	componentWillMount(){

	}

	render() {
    return (
			<div>
				<Link to={'/create'}>Create Post</Link>
			</div>

    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
