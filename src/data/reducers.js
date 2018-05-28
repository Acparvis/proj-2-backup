import initial from "./initial";
import {Map, fromJS} from 'immutable';

import { //Imports the actions to be fed into the reducer switch statement.
	UPDATE_POSTS,
	UPDATE_CATEGORIES,
	UPDATE_DETAIL_POST,
	UPDATE_DETAIL_POST_COMMENTS
} from "./actions/state"

// Updates the value state with whatever is in the input box.
const updatePosts = (state, {value}) => state.set("posts", value);

const updateCategories = (state, {value}) => state.set("categories", value);

const updateDetailPost = (state, {value}) => state.set("detailPost", value.data);

const updateDetailPostComments = (state, {value}) => state.set("detailPostComments", value.data);


// Reducer switch statement.
export default(state = initial, action) => {
	switch (action.type) {
		case UPDATE_POSTS:
			return updatePosts(state, action);
		case UPDATE_CATEGORIES:
			return updateCategories(state, action);
		case UPDATE_DETAIL_POST:
			return updateDetailPost(state, action);
		case UPDATE_DETAIL_POST_COMMENTS:
			return updateDetailPostComments(state, action);
		default:
			return state;
	}
};
