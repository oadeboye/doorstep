import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock, Glyphicon } from 'react-bootstrap';
import { removeRequest } from '../actions/removeRequest';
import { respondToRequest } from '../actions/respondToRequest';
import { connect } from 'react-redux';

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
    };
  }

  close() {
    this.setState({
      showEditModal: false,
    });
  }

  open() {
    this.setState({ showEditModal: true });
  }

  onOffer(e) {
    e.preventDefault();
    this.props.offerDispatch(this.props.user, this.props.request.requester, this.props.request, this.props.communityId);
    this.close();
  }

  onRemove(e) {
    e.preventDefault();
    this.props.removeRequestDispatch(this.props.request._id, this.props.communityId);
  }

  render() {
    console.log('requester', this.props.request.requester._id);
    console.log('user', this.props.user._id);
    const ownRequest = this.props.request.requester._id === this.props.user._id;
    return (
      <div className="request" onClick={ownRequest ? () => this.close() : () => this.open()}>
        <div className="request-title">{this.props.request.text}</div>
        {ownRequest ? <button className="x-btn" onClick={(e) => this.onRemove(e)}>x</button> : null}
        <Modal show={this.state.showEditModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Fulfill a Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h3>{this.props.request.requester.fName + " " + this.props.request.requester.lName} wants {this.props.request.text}!</h3>
              Would you like to fulfill this request?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-button-orange" onClick={(e) => this.onOffer(e)}>Yes</Button>
            <Button className="modal-button-red" onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Request.propTypes = {
  user: PropTypes.object,
  request: PropTypes.object,
  communityId: PropTypes.string,
  removeRequestDispatch: PropTypes.func,
  offerDispatch: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    request: ownProps.request,
    communityId: ownProps.communityId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    offerDispatch: (fulfiller, requester, request, communityId) => dispatch(respondToRequest(fulfiller, requester, request, communityId)),
    removeRequestDispatch: (requestId, communityId) => dispatch(removeRequest(requestId, communityId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Request);
