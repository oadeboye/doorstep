import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import RemoveItemModal from './modals/RemoveItemModal';
import { connect } from 'react-redux';
import { requestToTakeItem } from '../actions/requestToTakeItem';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showModal: false
    };
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onMessageChange(e) {
    this.setState({message: e.target.value});
  }

  sendMessage(e) {
    e.preventDefault();
    console.log('sending message...');
    this.props.requestToTakeItemDispatch(this.props.user, this.props.item.owner.phone, this.props.item, this.state.message);
    this.close();
  }

  render() {
    const verify = !this.props.pending && this.props.item.owner && (this.props.owner === JSON.parse(JSON.stringify(this.props.item.owner._id)));
    console.log('PENDING REQUEST', this.props.item.owner);
    const canRequest = this.props.user._id !== this.props.item.owner._id &&
    !this.props.item.owner.pendingRequest.pending;
    console.log('CAN REQUEST?', canRequest);
    return (
      <div>
        <div className="item" onClick={
          canRequest ?
          // this.props.user._id === this.props.item.owner._id || // if user owns the item or
          // this.props.item.owner.pendingRequest.requesterPhone === this.props.user.phone ? // if user has already requested this item
          () => this.open() : // user cannot request item
          () => this.close() // otherwise user can request item
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
                <p>Take</p>
              }
            </div>
            {/* <div className="description">{this.props.item.description}</div> */}
          </div>
        </div>
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
            <Button onClick={() => this.close()}>Cancel</Button>
            <Button onClick={(e) => this.sendMessage(e)}>Send message</Button>
          </Modal.Footer>
        </Modal>
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
  requestToTakeItemDispatch: PropTypes.func
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
    requestToTakeItemDispatch: (currUser, ownerPhone, item, message) => dispatch(requestToTakeItem(currUser, ownerPhone, item, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
