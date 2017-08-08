import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer
});

export default appReducer;