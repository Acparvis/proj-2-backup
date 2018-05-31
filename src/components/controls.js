import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {toJS} from 'immutable';
import axios from 'axios';

import {
	fetchPosts,
	changeFilter,
	fetchSortPosts
} from "../data/actions/state";



const mapStateToProps = state => {
	let posts = state.get("posts");
	let categories = state.get("categories");
	let filterSetting = state.get("filterSetting");

	return {
		posts: posts,
		categories: categories,
		filterSetting: filterSetting,
	}
};

const mapDispatchToProps = dispatch => ({
	postsFetch: () => dispatch(fetchPosts()),
	filterChange: (value) => dispatch(changeFilter(value)),
	postSort: (value) => dispatch(fetchSortPosts(value))
});

class Controls extends Component {

	componentWillMount(){

	}

	render() {
    return (
			<div>
				<Link to={'/create'}>Create Post</Link>

				<select value={this.props.filterSetting} onChange={(e) => this.props.filterChange(e.target.value)}>
						<option value="0">Choose a Filter</option>
						<option value="1">Date</option>
						<option value="2">Score</option>
				</select>
				<button onClick={() => this.props.postSort(this.props.filterSetting)}>Apply Filter</button>


				<div className="controls-container">
				<Link to={'/'}>All Posts</Link>
				{ this.props.categories.length > 0 ? this.props.categories.map((category, i) => {
					return <Link to={'/' + category.name} key={i + category}>{category.name}</Link>
				}) : null}
				</div>
			</div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
