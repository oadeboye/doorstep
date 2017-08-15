import Types from './actionTypes';
import axios from 'axios';

export function requestToTakeItem(user, ownerPhone, item, message) {
  return dispatch => {
    dispatch({
      type: Types.requestItemRequested
    });
    const error = false;
    console.log('USERNAME', user.username, user.fName);
    const content = `${user.fName} has requested ${item.name} from you with the following message:\n${message}. Would you like Doorstep to send ${user.fName} your phone number?`;
    axios.post('/twilio/send-message', {
      content,
      requester: user.username,
      requesterPhone: user.phone,
      ownerPhone: ownerPhone,
      itemId: item._id
    })
    .then(resp => {
      console.log('resp', resp);
      dispatch({
        type: Types.requestItemFulfilled,
        pendingRequests: resp.data.pendingRequests
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: Types.requestItemRejected,
        error: err
      });
    });
  };
}
