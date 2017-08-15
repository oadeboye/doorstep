import Types from './actionTypes';
import axios from 'axios';

export function addItem(itemObj) {
  return dispatch => {
    dispatch({
      type: Types.addItemRequested
    });
    const error = false;
    axios.post('/api/item', itemObj)
    .then((respJson) => {
      if (respJson.data.success) {
        axios.get('/api/community/' + itemObj.communityId)
        .then((resp2Json) => {
          const community = resp2Json.data.community;
          dispatch({
            type: Types.addItemFulfilled,
            community: community
          });
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: Types.addItemRejected,
        error: err
      });
    });
  };
}
