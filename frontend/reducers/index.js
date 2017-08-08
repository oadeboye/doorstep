import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import oneCommunityReducer from './oneCommunityReducer';
import usersCommunitiesReducer from './usersCommunitiesReducer';
import postCreateCommunityReducer from './postCreateCommunityReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer,
  currentComm: oneCommunityReducer,
  usersCommunities: usersCommunitiesReducer,
  createCommunityStatus: postCreateCommunityReducer
});

export default appReducer;
