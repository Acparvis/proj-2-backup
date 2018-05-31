import initial from "./initial";
import {Map, fromJS, toJS} from 'immutable';

import { //Imports the actions to be fed into the reducer switch statement.
	UPDATE_POSTS,
	UPDATE_CATEGORIES,
	UPDATE_DETAIL_POST,
	UPDATE_DETAIL_POST_COMMENTS,
	CHANGE_FILTER,
	SORT_POSTS
} from "./actions/state"

const updatePosts = (state, {value}) => state.set("posts", value);


const updateCategories = (state, {value}) => state.set("categories", value);

const updateDetailPost = (state, {value}) => state.set("detailPost", value.data);

const updateDetailPostComments = (state, {value}) => state.set("detailPostComments", value.data);

const changeFilter = (state, {value}) => {
	return state.set("filterSetting", value);
}

const sortPosts = (state, { value, data }) => {
	console.log(data);
	if (value == 0){
		return state.set("posts", data);
	} else if (value == 2){
		data.sort(function(a, b){return b.voteScore-a.voteScore})
		return state.set("posts", data);
	} else {
		data.sort(function(a, b){return b.timestamp-a.timestamp})
		return state.set("posts", data);
	}
}

// Reducer switch statement.
export default(state = initial, action) => {
	switch (action.type) {
	case CHANGE_FILTER:
		return changeFilter(state, action);
	case SORT_POSTS:
		return sortPosts(state, action);
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
