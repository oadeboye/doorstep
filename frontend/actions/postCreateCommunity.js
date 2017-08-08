import Types from './actionTypes';
import axios from 'axios';

function postCreateCommunity(name, description, owner) {
  console.log("IN DISPATCH");
  return dispatch => {
    dispatch({
      type: Types.postCreateCommunityRequested
    });
    axios.post('/api/community', {
      name: name,
      description: description,
      owner: owner
    })
    .then(response => {
      console.log("COMMUNITY SAVED", response.data)
      if (response.data.success) {
        return dispatch({
          type: Types.postCreateCommunityFulfilled,
          data: response.data.response
        });
      }
      else {
        throw new Error('Error: Cannot save community');
      }
    })
    .catch(error => {
      console.log('ERROR HERE', error);
      return dispatch({
        type: Types.postCreateCommunityRejected,
        error: error
      });
    });
  };
}

function clearCreateCommunityStatus() {
  return dispatch => dispatch({
    type: Types.clearCreateCommunityStatus
  })
}

export {
  postCreateCommunity,
  clearCreateCommunityStatus
};