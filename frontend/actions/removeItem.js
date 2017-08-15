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
      if (respJson.data.success) {
        axios.get('/api/community/' + itemObj.communityId)
        .then((resp2Json) => {
          const community = resp2Json.data.community;
          dispatch({
            type: Types.removeItemFulfilled,
            community: community
          });
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: Types.removeItemRejected,
        error: err
      });
    });
  };
}
