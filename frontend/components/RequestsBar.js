import React from 'react';
import Request from './Request';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import domain from '../domain';
import { getRequests } from '../actions/getRequests';
import { postRequest } from '../actions/postRequest';

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

  componentDidMount() {
    this.props.getRequestsDispatch(this.props.communityId);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onRequestChange(e) {
    var maxWords = 5 - e.target.value.split(" ");
    this.setState({request: e.target.value});
  }

  onRequest(e) {
    e.preventDefault();
    this.props.postRequestDispatch(this.props.user, this.props.communityId, this.state.request);
    this.close();
  }

  render() {
    const ready = this.props.requests;
    return (
      <div className="requests-bar">
        <button onClick={this.open.bind(this)} className="add-request-button">Add <Glyphicon glyph="plus"/></button>
        <div className="requests-bar-title">REQUESTS</div>
        <div className="requests-scroll">
        {
          !ready ? <p className="empty-list">Loading requests...</p> :
          this.props.requests.length === 0 ? <p className="empty-list">No Requests</p> :
          this.props.requests.map((request, index) =>
            <Request communityId={this.props.communityId} key={index} request={request}/>
          )
        }

        </div>
        <div className="scroll-indicator"><Glyphicon glyph="chevron-right"/></div>
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
                <Button className="modal-button-blue" onClick={(e) => this.onRequest(e)}>Request</Button>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-button-red" onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

RequestsBar.propTypes = {
  user: PropTypes.object,
  requests: PropTypes.array,
  communityId: PropTypes.string,
  getRequestsDispatch: PropTypes.func,
  postRequestDispatch: PropTypes.func,
  community: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    requests: state.requests.requests,
    communityId: ownProps.commId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestsDispatch: (communityId) => dispatch(getRequests(communityId)),
    postRequestDispatch: (requester, communityId, text) => dispatch(postRequest(requester, communityId, text))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RequestsBar);
