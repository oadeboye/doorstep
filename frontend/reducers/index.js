import { combineReducers } from 'redux';
import userReducer from './userReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import oneCommunityReducer from './oneCommunityReducer';
import usersCommunitiesReducer from './usersCommunitiesReducer';
import postCreateCommunityReducer from './postCreateCommunityReducer';
import allUsersReducer from './allUsersReducer';
import commUsersReducer from './commUsersReducer';
import requestsReducer from './requestsReducer';
import itemReducer from './itemReducer';

const appReducer = combineReducers({
  user: userReducer,
  allCommunities: allCommunitiesReducer,
  currentComm: oneCommunityReducer,
  commUsers: commUsersReducer,
  usersCommunities: usersCommunitiesReducer,
  createCommunityStatus: postCreateCommunityReducer,
  allUsers: allUsersReducer,
  requests: requestsReducer,
  item: itemReducer
});

export default appReducer;
