import React, { Component } from 'react';
import { connect } from "react-redux";
import CreateForm from "./createForm";
import {Link} from 'react-router-dom';

import {
	fetchPosts,
	fetchCategories,

} from "../data/actions/state";


const mapStateToProps = state => {
	let categories = state.get("categories");

	return {
		categories: categories,
	}
};

const mapDispatchToProps = dispatch => ({
	postsFetch: () => dispatch(fetchPosts()),
	categoryFetch: () => dispatch(fetchCategories()),
});

class PostNotFoundPage extends Component {

	componentWillMount(){
		this.props.categoryFetch()
	}

	render() {
    return (

				<div>
					<Link to={'/'}>Go Back</Link>
					<h1>404 post not found!</h1>
				</div>


    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(PostNotFoundPage);
