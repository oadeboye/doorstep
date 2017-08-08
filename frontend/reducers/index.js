import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import oneCommunityReducer from './oneCommunityReducer';
import allUsersReducer from './allUsersReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer,
  currentComm: oneCommunityReducer,
  allUsers: allUsersReducer,
});

export default appReducer;
