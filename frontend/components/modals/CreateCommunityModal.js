import React from 'react';
import { Modal,
         Form,
         FormGroup,
         Col,
         FormControl,
         ControlLabel,
         Button,
         FieldGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { postCreateCommunity, clearCreateCommunityStatus } from '../../actions/postCreateCommunity';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';

class CreateCommunityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      communityName: '',
      communityDescription: '',
      member: '',
      userCommunities: [],
      userHasCommunities: false,
      loaded: false
    };
  }

  onCreateCommunity(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onCommunityNameChange(e) {
    this.setState({communityName: e.target.value});
  }

  onCommunityDescriptionChange(e) {
    this.setState({communityDescription: e.target.value});
  }

  onAddMembersChange(e) {
    this.setState({member: e.target.value});
  }

  onCreate(e, name, description, userId) {
    e.preventDefault();
    this.props.postCreateCommunityDispatch(name, description, userId);
    console.log("STATUS", this.props.createCommunityStatus);
    this.close();
  }

  navigateToCommunityProfile() {
    this.props.clearCreateCommunityStatusDispatch();
  }

  render() {
    return (
      <div>
        {
          this.props.createCommunityStatus.success &&
           <Modal show>
             <div className="confirmation-modal">
              <Modal.Title className="confirmation-title">Community Created</Modal.Title>
              <Link to={'/community/profile/' + this.props.createCommunityStatus.data._id}><Button className="modal-button-orange navigation-button" onClick={() => this.navigateToCommunityProfile()}>Go to page</Button></Link>
             </div>
           </Modal>
        }
        <div className="create-community-button" onClick={(e) => this.onCreateCommunity(e)}>Create a community</div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new community!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <ControlLabel>Community name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => this.onCommunityNameChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Community description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => this.onCommunityDescriptionChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Members</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter a username"
                  onChange={(e) => this.onAddMembersChange(e)}
                />
                <Button componentClass={ControlLabel}>
                  Add more members
                </Button>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-button-orange" onClick={(e) => this.onCreate(e, this.state.communityName, this.state.communityDescription, this.props.user._id)}>Create new community</Button>
            <Button className="modal-button-red" onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CreateCommunityModal.propTypes = {
  user: PropTypes.object,
  postCreateCommunityDispatch: PropTypes.func,
  clearCreateCommunityStatusDispatch: PropTypes.func,
  createCommunityStatus: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    createCommunityStatus: state.createCommunityStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postCreateCommunityDispatch: (name, description, owner) => dispatch(postCreateCommunity(name, description, owner)),
    clearCreateCommunityStatusDispatch: () => dispatch(clearCreateCommunityStatus())
  };
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(CreateCommunityModal);
