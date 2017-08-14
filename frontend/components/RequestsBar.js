import React from 'react';
import Request from './Request';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import domain from '../domain';
import { getRequests } from '../actions/getRequests';
import { getOneCommunity } from '../actions/getOneCommunity';
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

  componentWillMount() {
    // console.log('WILL MOUNT', this.props);
    this.props.getRequestsDispatch(this.props.community._id);
    console.log('REQUESTS', this.props.requests);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onRequestChange(e) {
    var maxWords = 5 - e.target.value.split(" ");
    console.log('maxWords', maxWords);
    this.setState({request: e.target.value});
  }

  onRequest(e) {
    e.preventDefault();
    this.props.postRequestDispatch(this.props.user, this.props.communityId, this.state.request);
    this.close();
    // console.log('REQUESTING ITEM');
    // console.log('HISTORy', this.props.commId);
    // axios.post(domain + '/api/request/', {
    //   requester: this.props.user._id,
    //   text: this.state.request,
    //   datePosted: new Date(),
    //   communityId: this.props.commId
    // })
    // .then((resp) => {
    //   console.log('posting a request', resp);
    //   this.props.handleRequest();
    //   this.close();
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  render() {
    console.log('REQUESTS BAR', this.props.community);
    return (
      <div className="requests-bar">
        <button onClick={this.open.bind(this)} className="add-request-button">+</button>
        <div className="requests-bar-title">REQUESTS</div>
        {/* <Request />
        <Request />
        <Request />
        <Request /> */}
        {this.props.community.requests.map((request, index) => <Request key={index} request={request}/>)}
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

RequestsBar.propTypes = {
  user: PropTypes.object,
  requests: PropTypes.array,
  communityId: PropTypes.string,
  getRequestsDispatch: PropTypes.func,
  postRequestDispatch: PropTypes.func,
  community: PropTypes.object,
  match: PropTypes.objects
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    requests: state.requests.requests,
    communityId: ownProps.commId,
    community: state.currentComm.community,
    match: ownProps.match
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestsDispatch: (communityId) => dispatch(getRequests(communityId)),
    getOneCommunityDispatch: (communityId) => dispatch(getOneCommunity(communityId)),
    postRequestDispatch: (requester, communityId, text) => dispatch(postRequest(requester, communityId, text))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RequestsBar);
