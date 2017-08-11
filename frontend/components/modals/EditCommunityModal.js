import React from 'react';
import { Modal,
         Button,
         FieldGroup,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         HelpBlock,
         InputGroup,
         Form,
         Input } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { editCommunity } from '../../actions/editCommunity';

class EditCommunityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      name: this.props.community.name,
      description: this.props.community.description
    };
  }

  closeEdit() {
    this.setState({ showEditModal: false });
  }

  openEdit() {
    this.setState({ showEditModal: true });
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onCommunityNameChange(e) {
    this.setState({name: e.target.value});
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.editCommunityDispatch(this.state.name, this.state.description, this.props.community._id);
    this.closeEdit();
  }

  validateCommunityName() {
    if (this.state.name.trim(' ') !== '') {
      return 'success';
    }
    return 'warning';
  }

  validateDescription() {
    if (this.state.description.trim(' ') !== '') {
      return 'success';
    }
    return 'warning';
  }

  render() {
    return (
      <div>
        <button className="edit-profile-button" onClick={() => this.openEdit()}>Edit Community Profile</button>
        <Modal show={this.state.showEditModal} onHide={() => this.closeEdit()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {this.props.community.name} Community Profile!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="fName"
                validationState={this.validateCommunityName()}>
                <ControlLabel>Community Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.onCommunityNameChange(e)}
                />
                <FormControl.Feedback />
                <HelpBlock>Community name is required</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="lName"
                validationState={this.validateDescription()}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.description}
                  onChange={(e) => this.onDescriptionChange(e)}
                />
                <FormControl.Feedback />
                <HelpBlock>Description is required</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onSubmit(e)}>Submit edit</Button>
            <Button onClick={() => this.closeEdit()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

EditCommunityModal.propTypes = {
  currentComm: PropTypes.object,
  community: PropTypes.object,
  editCommunityDispatch: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentComm: state.currentComm.community,
    community: ownProps.community
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCommunityDispatch: (name, description, communityId) => dispatch(editCommunity(name, description, communityId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommunityModal);
