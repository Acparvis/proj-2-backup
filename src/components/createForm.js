import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link, Redirect} from 'react-router-dom';

import {
	createPost

} from "../data/actions/state";



const mapStateToProps = state => {
	let posts = state.get("posts");

	return {
		posts: posts,
	}
};

const mapDispatchToProps = dispatch => ({
	postCreate: (value) => dispatch(createPost(value)),

});

function guidGenerator() {
	var S4 = function() {
		 return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

class CreateForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
			title: '',
			body: '',
			author: '',
			category: '',
			timestamp: Date.now(),
			id: guidGenerator(),
			toDashboard: false,
	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleContent = this.handleContent.bind(this);
		this.handleAuthor = this.handleAuthor.bind(this);
		this.handleCategory = this.handleCategory.bind(this);

  }

  handleChange(event) {
    this.setState({title: event.target.value});
  }

	handleContent(event) {
    this.setState({body: event.target.value});
  }

	handleAuthor(event) {
		this.setState({author: event.target.value});
	}

	handleCategory(event) {
		this.setState({category: event.target.value});
	}

  handleSubmit(event) {
		event.preventDefault();
    this.props.postCreate(this.state)
		this.setState({ toDashboard: true})
  }



	render() {

		if (this.state.toDashboard === true) {
		 return <Redirect to='/' />
	 }

    return (
			<div>
					<form className="form-container" onSubmit={this.handleSubmit}>
					<label>Title</label>
						<input type="text" value={this.state.value} onChange={this.handleChange} />

						<label>Content</label>
						<input type="text" value={this.state.value} onChange={this.handleContent} />

						<label>Author</label>
						<input type="text" value={this.state.value} onChange={this.handleAuthor} />

						<select value={this.state.value} onChange={this.handleCategory}>
								<option value="">Choose a Category</option>
								{this.props.categories.length > 0 ? this.props.categories.map((category, i) =>{
										return <option key={i} value={category.name}>{category.name}</option>
								}) : null}
						</select>
						<input type="submit" value="Submit" />
					</form>
			</div>

    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
