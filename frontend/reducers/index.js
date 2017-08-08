import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import oneCommunityReducer from './oneCommunityReducer';
import usersCommunitiesReducer from './usersCommunitiesReducer';
import postCreateCommunityReducer from './postCreateCommunityReducer';
import allUsersReducer from './allUsersReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer,
  currentComm: oneCommunityReducer,
  usersCommunities: usersCommunitiesReducer,
  createCommunityStatus: postCreateCommunityReducer
  allUsers: allUsersReducer
});

export default appReducer;
