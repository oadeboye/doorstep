import Types from './actionTypes';
import axios from 'axios';

export function changeItemStatus(itemId) {
  return dispatch => {
    dispatch({
      type: Types.itemStatusChangeRequested
    });
    const error = false;
    axios.post('/api/item/' + itemId)
    .then(response => {
      dispatch({
        type: Types.itemStatusChangeFulfilled,
        action: response.data.item
      });
    }).
    catch(error =>{
      dispatch({
        type: Types.itemStatusChangeRejected,
        error
      });
    });
  };
}
