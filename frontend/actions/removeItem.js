import Types from './actionTypes';
import axios from 'axios';

export function removeItem(itemObj) {
  return dispatch => {
    dispatch({
      type: Types.removeItemRequested
    });
    const error = false;
    axios.post('/api/item-delete', itemObj)
    .then((respJson) => {
      const community = respJson.data.response;
      dispatch({
        type: Types.removeItemFulfilled,
        community: community
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.removeItemRejected,
        error: err
      });
    });
  };
}
