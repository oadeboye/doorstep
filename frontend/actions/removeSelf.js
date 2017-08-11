import Types from './actionTypes';
import axios from 'axios';
import domain from '../domain';

export function removeSelf(removeObj) {
  console.log("MADE IT TO REMOVE SELF");
  return dispatch => {
    console.log("DISPATCH REMOVE SELF");
    dispatch({
      type: Types.removeSelfRequested
    });
    const error = false;
    axios.post('/api/remove-self', removeObj)
    .then(respJson => {
      if (respJson.data.success) {
        console.log("BEFORE SECOND AXIOS CALL");
        axios.get('/api/communities/' + removeObj.userId)
        .then((resp2) => {
          const communities = resp2.data;
          console.log("FULFILLED REMOVE SELF", communities);
          return dispatch({
            type: Types.removeSelfFulfilled,
            data: communities
          });
        });
      }
    })
    .catch(error => {
      console.log("ERROR LOGGING IN", error);
      return dispatch({
        type: Types.removeSelfRejected,
        error: error
      });
    });
  };
}
