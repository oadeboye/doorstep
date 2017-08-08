import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import oneCommunityReducer from './oneCommunityReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer,
  currentComm: oneCommunityReducer
});

export default appReducer;
