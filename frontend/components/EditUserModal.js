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
import { saveUser } from '../actions/index';

class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      fName: this.props.user.fName,
      lName: this.props.user.lName,
      email: this.props.user.email,
      aboutMe: this.props.user.aboutMe
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

  onFirstNameChange(e) {
    this.setState({fName: e.target.value});
  }

  onLastNameChange(e) {
    this.setState({lName: e.target.value});
  }

  onEdit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/edit-profile/' + this.props.user._id, {
      fName: this.state.fName,
      lName: this.state.lName,
      email: this.state.email
    })
    .then((resp) => {
      if (resp.data.success) {
        this.closeEdit();
        this.props.saveUserEdits({
          fName: this.state.fName,
          lName: this.state.lName,
          email: this.state.email
        });
      }
    })
    .catch((err) => {
      console.log("ERROR ON EDIT USER MODAL", err);
    });
  }

  render() {
    return (
      <Modal show={this.state.showEditModal} onHide={() => this.closeEdit()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your profile!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
             controlId="fName"
             validationState={this.validateFirstName()}>
             <ControlLabel>First Name</ControlLabel>
             <FormControl
               type="text"
               value={this.state.user.fName}
               onChange={(e) => this.onFirstNameChange(e)}
             />
             <FormControl.Feedback />
             <HelpBlock>First name is required</HelpBlock>
            </FormGroup>
            <FormGroup
              controlId="lName"
              validationState={this.validateLastName()}>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.user.lName}
                onChange={(e) => this.onLastNameChange(e)}
              />
              <FormControl.Feedback />
              <HelpBlock>Last name is required</HelpBlock>
            </FormGroup>
            <FormGroup
              controlId="email"
              validationState={this.validateEmail()}>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                value={this.state.user.email}
                onChange={(e) => this.onEmailChange(e)}
             />
             <FormControl.Feedback />
             <HelpBlock>Email is required</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => this.onEdit(e)}>Edit</Button>
          <Button onClick={() => this.closeEdit()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditUserModal.propTypes = {
  user: PropTypes.object,
  saveUserEdits: PropTypes.func
};

export default EditUserModal;
