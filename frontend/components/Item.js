import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import RemoveItemModal from './modals/RemoveItemModal';
import { connect } from 'react-redux';
import { requestToTakeItem } from '../actions/requestToTakeItem';
import { changeItemStatus } from '../actions/changeItemStatus';
import swal from 'sweetalert';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showModal: false,
      itemStatus: 'Take'
    };
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  cannotRequest() {
    console.log('cannot request');
    swal({
      title: "Cannot request this item",
      text: "You probably have requested this item but forgot about that. Greed is not a virtue",
      type: "error"
    });
    this.setState({showModal: false});
  }

  onMessageChange(e) {
    this.setState({message: e.target.value});
  }

  sendMessage(e) {
    e.preventDefault();
    console.log('sending message to... ' + this.props.item.owner.phone);
    this.props.requestToTakeItemDispatch(this.props.user, this.props.item.owner.phone, this.props.item, this.state.message);
    // this.setState({itemStatus: 'Pending request'});
    this.props.changeStatusDispatch(this.props.item._id);
    this.close();
  }

  render() {
    const verify = !this.props.pending && this.props.item.owner && (this.props.owner === JSON.parse(JSON.stringify(this.props.item.owner._id)));
    var requests = this.props.item.owner.pendingRequests.map(request => request.itemId);
    const canRequest = requests.indexOf(this.props.item._id) === -1;
    const ownItem = this.props.user._id === this.props.item.owner._id;
    return (
      <div>
        <div className="item" onClick={
          !ownItem ?
            (canRequest ?
              () => this.open() : // user cannot request item
              () => this.cannotRequest()) : // otherwise user can request item
          () => this.close()
        } className="item">
          <div className="img-wrapper">
            <img alt="someImage" src={this.props.item.imgURL || "https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg"}/>
          </div>
          <div className="item-info">
            <div className="item-title">
              {this.props.item.name}
              { verify ?
                <RemoveItemModal item={this.props.item}/>
                :
                <p className="take-button">{this.state.itemStatus}
                  <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                      <Modal.Title>Request this item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Message to {this.props.item.owner.fName}</ControlLabel>
                          <FormControl
                            type="text"
                            componentClass="textarea"
                            placeholder="Message"
                            onChange={(e) => this.onMessageChange(e)}
                          />
                        </FormGroup>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="modal-button-blue" onClick={(e) => this.sendMessage(e)}>Send message</Button>
                      <Button className="modal-button-red" onClick={() => this.close()}>Cancel</Button>
                    </Modal.Footer>
                  </Modal>
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  user: PropTypes.object,
  owner: PropTypes.string,
  pending: PropTypes.bool,
  index: PropTypes.number,
  requestToTakeItemDispatch: PropTypes.func,
  changeStatusDispatch: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    owner: state.user.user._id,
    pending: ownProps.pending,
    item: ownProps.item,
    index: ownProps.index
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestToTakeItemDispatch: (currUser, ownerPhone, item, message) => dispatch(requestToTakeItem(currUser, ownerPhone, item, message)),
    changeStatusDispatch: (itemId) => dispatch(changeItemStatus(itemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
