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
import { postCreateCommunity, clearCreateCommunityStatus } from '../actions/postCreateCommunity';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    this.close();
  }

  navigateToCommunityProfile() {
    console.log("CLEARING")
    this.props.clearCreateCommunityStatusDispatch();
  }

  render() {
    console.log("ID???", this.props.createCommunityStatus);
    return (
      <div>
        {
          this.props.createCommunityStatus.success &&
           <Modal show>
            <Modal.Title>Community Created</Modal.Title>
            <Link to={'/community/profile/' + this.props.createCommunityStatus.data._id}><Button onClick={() => this.navigateToCommunityProfile()}>Go to page</Button></Link>
           </Modal>
        }
        <button onClick={(e) => this.onCreateCommunity(e)} className="add-community-button">Create a community</button>
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
                <Button componentClass={ControlLabel}>
                  Add more members
                </Button>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onCreate(e, this.state.communityName, this.state.communityDescription, this.props.user._id)}>Create a new community</Button>
            <Button onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CreateCommunityModal.propTypes = {
  user: PropTypes.object,
  postCreateCommunityDispatch: PropTypes.func,
  clearCreateCommunityStatusDispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
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
