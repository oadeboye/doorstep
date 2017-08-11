import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { removeMember } from '../actions/removeMember';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  open(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  removeMember(e) {
    e.preventDefault();
    console.log('removing member...');
    this.props.removeMemberDispatch(this.props.communityId, this.props.user._id);
  }

  render() {
    return (
      <Link to={'/view/profile/' + this.props.user._id}>
        <div className="member">
          <div className="img-wrapper">
            <img alt="user profile" src={this.props.user.imgURL || 'https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg'} />
          </div>
          <div className="member-info">
            {
              this.props.currentUser._id === this.props.user._id ? null : // can only delete other users
              <button onClick={(e) => this.open(e)}>x</button> // not self
            }
            <h3 className="member-name">{this.props.user.fName + ' ' + this.props.user.lName}</h3>
            <div className="stats-box">
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Removing member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this member?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Cancel</Button>
            <Button onClick={(e) => this.removeMember(e)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </Link>
    );
  }
}

Member.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  communityId: PropTypes.string,
  removeMemberDispatch: PropTypes.func,
  commUsers: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    commUsers: state.commUsers.commUsers,
    communityId: ownProps.communityId,
    user: ownProps.user,
    currentUser: state.user.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMemberDispatch: (communityId, userId) => dispatch(removeMember(communityId, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
