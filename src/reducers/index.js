import { combineReducers } from 'redux';
import { authReducer as auth } from './authReducer';
import { homeReducer as home } from './homeReducer';
import { browseReducer as browse } from './browseReducer';
import { modalReducer as modal } from './modalReducer';
import { postReducer as posts } from './postReducer';
import { likedPostReducer as likedPosts } from './likedPostReducer';
import { searchReducer as search_term } from './searchReducer';
import { followReducer as follow } from './followReducer';
import { userReducer as user_details } from './userReducer';

export default combineReducers({
  auth,
  home,
  browse,
  modal,
  posts,
  likedPosts,
  search_term,
  follow,
  user_details,
});
