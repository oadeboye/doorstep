import Types from './actionTypes';
import axios from 'axios';

export function addItem(itemObj) {
  return dispatch => {
    console.log("ADD ITEM REQUESTED DISPATCH");
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
      console.log("ADD ITEM ERROR DISPATCH", err);
      dispatch({
        type: Types.addItemRejected,
        error: err
      });
    });
  };
}
