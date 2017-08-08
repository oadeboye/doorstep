import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import oneCommunityReducer from './oneCommunityReducer';
import allUsersReducer from './allUsersReducer';
import commUsersReducer from './commUsersReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer,
  currentComm: oneCommunityReducer,
  allUsers: allUsersReducer,
  commUsers: commUsersReducer
});

export default appReducer;
