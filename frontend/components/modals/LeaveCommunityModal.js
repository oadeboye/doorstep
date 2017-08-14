import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Modal,
         Button,
         Input } from 'react-bootstrap';

import { removeSelf } from '../../actions/removeSelf';

class LeaveCommunityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    console.log("HEY BITCH IM THE BUTTON");
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("USER ID HERE", this.props.thisUser._id);
    console.log("COMMUNITY ID HERE", this.props.community._id);
    const removeObj = {
      userId: this.props.thisUser._id,
      communityId: this.props.community._id
    };
    this.props.removeSelf(removeObj);
    this.close();
    this.props.history.push('/profile');
  }

  render() {
    console.log("THE BUTTON LIVETH");
    return (
      <div>
        <button className="leave-profile-button" onClick={() => this.open()}>Leave the Community</button>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Leave {this.props.community.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Would you really like to leave {this.props.community.name}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-button-blue" onClick={(e) => this.onSubmit(e)}>Yes!</Button>
            <Button className="modal-button-red" onClick={() => this.close()}>No, keep me in the community!</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    thisUser: state.user.user,
    community: state.currentComm.community,
    history: ownProps.history
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    removeSelf: (removeObj) => {
      dispatch(removeSelf(removeObj));
    }
  };
};

LeaveCommunityModal.propTypes = {
  thisUser: PropTypes.object,
  removeSelf: PropTypes.func,
  community: PropTypes.object,
  history: PropTypes.array
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(LeaveCommunityModal);
