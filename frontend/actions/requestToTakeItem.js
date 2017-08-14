import Types from './actionTypes';
import axios from 'axios';

export function requestToTakeItem(user, ownerPhone, item, message) {
  return dispatch => {
    dispatch({
      type: Types.requestItemRequested
    });
    const error = false;
    const content = `${user.fName} has requested ${item.name} from you with the following message:\n${message}. Reply YES to allow Doorstep to reveal your number`;
    // console.log('TO', this.props.item.owner.phone);
    axios.post('/twilio/send-message', {
      content,
      requesterPhone: user.phone,
      ownerPhone: ownerPhone,
      itemId: item._id
    })
    .then(resp => {
      console.log('resp', resp);
      dispatch({
        type: Types.requestItemFulfilled,
        pendingRequest: resp.data.pendingRequest
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
