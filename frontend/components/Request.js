import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock, Glyphicon } from 'react-bootstrap';

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

  open(e) {
    e.preventDefault();
    this.setState({ showEditModal: true });
  }

  onRemove(e) {

  }

  render() {
    return (
      <div className="request" onClick={(e) => this.open(e)}>
        <div className="request-title">{this.props.request.text}</div>
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
            <Button className="modal-button-orange" onClick={(e) => this.onRemove(e)}>Yes, please!</Button>
            <Button className="modal-button-red" onClick={() => this.close()}>No! Cancel.</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Request.propTypes = {
  request: PropTypes.object
};

export default Request;
