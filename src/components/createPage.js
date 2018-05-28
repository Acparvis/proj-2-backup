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

class CreatePage extends Component {

	componentWillMount(){
		this.props.categoryFetch()
	}

	render() {
    return (

				<div>
					<Link to={'/'}>Go Back</Link>
					<CreateForm categories={this.props.categories}/>
				</div>


    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
