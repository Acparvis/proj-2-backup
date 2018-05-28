import axios from 'axios';

export const UPDATE_POSTS = Symbol("UPDATE_POSTS");

export const updatePosts = (value) => ({
	type: UPDATE_POSTS,
	value
});

export function fetchPosts() {
    return dispatch => {
			axios.get('http://localhost:3001/posts', { headers: { 'Authorization': 'whatever-you-want' }})
			 .then(response => dispatch(updatePosts(response.data)))

    }
}

export const UPDATE_CATEGORIES = Symbol("UPDATE_CATEGORIES");

export const updateCategories = (value) => ({
	type: UPDATE_CATEGORIES,
	value
});

export function fetchCategories() {
    return dispatch => {
			axios.get('http://localhost:3001/categories', { headers: { 'Authorization': 'whatever-you-want' }})
			 .then(response => dispatch(updateCategories(response.data.categories)))

    }
}


export const UPDATE_DETAIL_POST = Symbol("UPDATE_DETAIL_POST");

export const updateDetailPost = (value) => ({
	type: UPDATE_DETAIL_POST,
	value
});


export function viewPostUpdate(id) {
    return dispatch => {
			axios.get('http://localhost:3001/posts/' + id , { headers: { 'Authorization': 'whatever-you-want' }})
			 .then(response => dispatch(updateDetailPost(response)))

    }
}

export const UPDATE_DETAIL_POST_COMMENTS = Symbol("UPDATE_DETAIL_POST_COMMENTS");

export const updateDetailPostComments = (value) => ({
	type: UPDATE_DETAIL_POST_COMMENTS,
	value
});

export function viewPostComments(id) {
    return dispatch => {
			axios.get('http://localhost:3001/posts/' + id + '/comments/' , { headers: { 'Authorization': 'whatever-you-want' }})
			 .then(response => dispatch(updateDetailPostComments(response)))

    }
}

export function createPost(value) {
    return dispatch => {
			axios.post('http://localhost:3001/posts/', value , { headers: { 'Authorization': 'whatever-you-want' }})
		 .then(response => dispatch(fetchPosts()))
    }
}

export function deletePost(id) {
    return dispatch => {
			axios.delete('http://localhost:3001/posts/' + id, { headers: { 'Authorization': 'whatever-you-want' }})
		 .then(response => dispatch(fetchPosts()))
    }
}


export function vote(id, direction) {
		if (direction === "up"){
			return dispatch => {
				axios.post('http://localhost:3001/posts/' + id, {option: "upVote"} , { headers: { 'Authorization': 'whatever-you-want' }})
				 .then(response => dispatch(fetchPosts()))
			 }
		 } else if (direction === "down"){
			 return dispatch => {
 				axios.post('http://localhost:3001/posts/' + id, {option: "downVote"} , { headers: { 'Authorization': 'whatever-you-want' }})
 				 .then(response => dispatch(fetchPosts()))
 			 }
		 }
	}

	export function voteDetail(id, direction) {
			if (direction === "up"){
				return dispatch => {
					axios.post('http://localhost:3001/posts/' + id, {option: "upVote"} , { headers: { 'Authorization': 'whatever-you-want' }})
					 .then(response => dispatch(viewPostUpdate(id)))
				 }
			 } else if (direction === "down"){
				 return dispatch => {
	 				axios.post('http://localhost:3001/posts/' + id, {option: "downVote"} , { headers: { 'Authorization': 'whatever-you-want' }})
	 				 .then(response => dispatch(viewPostUpdate(id)))
	 			 }
			 }
		}

		export function editPost(value) {
				return dispatch => {
					axios.put('http://localhost:3001/posts/' + value.id, {title: value.title, body: value.body} , { headers: { 'Authorization': 'whatever-you-want' }})
				 .then(response => dispatch(viewPostUpdate(value.id)))
				}
		}



		//////////////////////////////// Comment actions

		export function voteComment(id, direction, parentId) {
				if (direction === "up"){
					return dispatch => {
						axios.post('http://localhost:3001/comments/' + id, {option: "upVote"} , { headers: { 'Authorization': 'whatever-you-want' }})
						 .then(response => dispatch(viewPostComments(parentId)))
					 }
				 } else if (direction === "down"){
					 return dispatch => {
						axios.post('http://localhost:3001/comments/' + id, {option: "downVote"} , { headers: { 'Authorization': 'whatever-you-want' }})
						 .then(response => dispatch(viewPostComments(parentId)))
					 }
				 }
			}

			export function deleteComment(id, parentId) {
			    return dispatch => {
						axios.delete('http://localhost:3001/comments/' + id, { headers: { 'Authorization': 'whatever-you-want' }})
					 .then(response => dispatch(viewPostComments(parentId)))
			    }
			}

			export function createComment2(value) {
					return dispatch => {
						axios.post('http://localhost:3001/comments/', value , { headers: { 'Authorization': 'whatever-you-want' }})
					 .then(response => dispatch(viewPostComments(value.parentId)))
					}
			}

			export function editComment(value) {
					return dispatch => {
						axios.put('http://localhost:3001/comments/' + value.id, {body: value.body, timestamp: value.timestamp} , { headers: { 'Authorization': 'whatever-you-want' }})
					 .then(response => dispatch(viewPostComments(value.parentId)))
					}
			}
