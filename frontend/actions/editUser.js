import Types from './actionTypes';
import axios from 'axios';
import domain from '../domain';

export function editUser(edits, id) {
  return dispatch => {
    dispatch({
      type: Types.editUserRequested
    });
    const error = false;
    axios.post(domain + '/api/edit-profile/' + id, edits)
    .then(response => {
      dispatch({
        type: Types.editUserFulfilled,
        edits
      });
    })
    .catch(error => {
      console.log("ERROR EDIT PROFILE", error);
      return dispatch({
        type: Types.editUserRejected,
        error
      });
    });
  };
}
