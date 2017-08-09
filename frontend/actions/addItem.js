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
      const community = respJson.data.community;
      dispatch({
        type: Types.addItemFulfilled,
        community: community
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.addItemRejected,
        error: err
      });
    });
  };
}
