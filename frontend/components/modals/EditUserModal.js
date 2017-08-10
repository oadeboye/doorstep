import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
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

import { editUser } from '../../actions/editUser';

class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      fName: this.props.thisUser.fName,
      lName: this.props.thisUser.lName,
      email: this.props.thisUser.email,
    };
    console.log("EDIT USER MODAL LIVETH", this.state);
  }

  closeEdit() {
    this.setState({
      showEditModal: false,
      fName: this.props.thisUser.fName,
      lName: this.props.thisUser.lName,
      email: this.props.thisUser.email
    });
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

  onSubmit(e) {
    e.preventDefault();
    const editObj = {
      fName: this.state.fName,
      lName: this.state.lName,
      email: this.state.email
    };
    console.log("EDITING HERE");
    this.props.editUser(editObj, this.props.thisUser._id);
    this.closeEdit();
  }

  validateFirstName() {
    if (this.state.fName.trim(' ') !== '') {
      return 'success';
    }
    return 'warning';
  }

  validateLastName() {
    if (this.state.lName.trim(' ') !== '') {
      return 'success';
    }
    return 'warning';
  }

  validateEmail() {
    if (this.state.email.includes('@')) {
      return 'success';
    }
    return "warning";
  }

  render() {
    console.log("INSIDE RENDER OF EDIT USER MODAL");
    return (
      <div>
        <button className="edit-profile-button" onClick={() => this.openEdit()}>Edit Profile</button>
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
                  value={this.state.fName}
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
                  value={this.state.lName}
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
                  value={this.state.email}
                  onChange={(e) => this.onEmailChange(e)}
                />
                <FormControl.Feedback />
                <HelpBlock>Email is required</HelpBlock>
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

const mapStateToProps = ( state ) => {
  return {
    thisUser: state.user.user
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    editUser: (editObject, id) => {
      dispatch(editUser(editObject, id));
    }
  };
};

EditUserModal.propTypes = {
  thisUser: PropTypes.object,
  editUser: PropTypes.func,
  onEdit: PropTypes.func
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(EditUserModal);
