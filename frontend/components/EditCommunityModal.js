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

class EditCommunityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      name: this.props.community.name,
      description: this.props.community.description,
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
    const editCommunityObj = {
      name: this.state.name,
      description: this.state.description,
    };
    console.log("EDITING HERE");
    this.props.onCommunityEdit(editCommunityObj);
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
        <div onClick={() => this.openEdit()}>Edit Profile</div>
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
            <Button onClick={(e) => this.onSubmit(e)}>Edit</Button>
            <Button onClick={() => this.closeEdit()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

EditCommunityModal.propTypes = {
  community: PropTypes.object,
  onCommunityEdit: PropTypes.func
};

export default EditCommunityModal;
