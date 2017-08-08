import React from 'react';
import Request from './Request';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RequestsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      request: '',
      maxWords: 5,
      requests: []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({requests: props.requests});
    console.log('PROPS', props.requests);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onRequestChange(e) {
    this.setState({request: e.target.value});
  }

  onRequest(e) {
    e.preventDefault();
    console.log('REQUESTING ITEM');
    console.log('HISTORy', this.props.commId);
    axios.post('http://localhost:3000/api/request/', {
      requester: this.props.user._id,
      text: this.state.request,
      datePosted: new Date(),
      communityId: this.props.commId
    })
    .then((resp) => {
      console.log('posting a request', resp);
      this.props.handleRequest();
      this.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="requests-bar">
        <button onClick={this.open.bind(this)} className="add-request-button">+</button>
        <div className="requests-bar-title">REQUESTS</div>
        {/* <Request />
        <Request />
        <Request />
        <Request /> */}
        {this.state.requests.map((request, index) => <Request key={index} />)}
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Make a request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <ControlLabel>What item would you like to request?</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => this.onRequestChange(e)}
                />
                <HelpBlock>Limit: {this.state.maxWords} words</HelpBlock>
                <Button onClick={(e) => this.onRequest(e)}>Request</Button>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

RequestsBar.propTypes = {
  user: PropTypes.object,
  requests: PropTypes.array,
  handleRequest: PropTypes.func
};

export default connect(
  mapStateToProps
)(RequestsBar);
