import React from 'react';
import { Modal,
         Button,
         FieldGroup,
         FormGroup,
         Col,
         ControlLabel,
         Form,
         FormControl } from 'react-bootstrap';
import axios from 'axios';
// import styles from '../assets/stylesheets';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showRegisterModal: false,
      usernameLogin: '',
      passwordLogin: '',
      usernameReg: '',
      passwordReg: '',
      fName: '',
      lName: ''
    };
  }

  closeLogin() {
    this.setState({ showLoginModal: false });
  }

  openLogin() {
    this.setState({ showLoginModal: true });
  }

  onUsernameLoginChange(e) {
    this.setState({usernameLogin: e.target.value});
  }

  onPasswordLoginChange(e) {
    this.setState({passwordLogin: e.target.value});
  }

  onLogin(e) {
    e.preventDefault();
    console.log('username', this.state.usernameLogin);
    console.log('password', this.state.passwordLogin);
    axios.post('http://localhost:3000/login', {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
    })
    .then((resp) => {
      if (resp.data.success) {
        console.log('Logged in!');
        this.closeLogin();
      }
    })
    .catch((err) => {
      console.log('Error loggin in:', err);
    });
  }

  closeRegister() {
    this.setState({ showRegisterModal: false });
  }

  openRegister() {
    this.setState({ showRegisterModal: true });
  }

  onUsernameRegChange(e) {
    this.setState({usernameReg: e.target.value});
  }

  onPasswordRegChange(e) {
    this.setState({passwordReg: e.target.value});
  }

  onFirsNameRegChange(e) {
    this.setState({fName: e.target.value});
  }

  onLastNameRegChange(e) {
    this.setState({lName: e.target.value});
  }

  onRegister(e) {
    e.preventDefault();
    console.log('trying to reg');
    axios.post('http://localhost:3000/register', {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.usernameReg,
      password: this.state.passwordReg,
    })
    .then((resp) => {
      console.log('HERE');
      if (resp.data.success) {
        console.log('Successful registration:', resp.data);
        this.closeReg();
      }
    })
    .catch((err) => {
      console.log('Error registering', err);
    });
  }

  render() {
    return (
      <div className="welcome-page">
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.openLogin()}
        >Login
        </Button>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.openRegister()}
        >Register
        </Button>
        <Modal show={this.state.showLoginModal} onHide={() => this.closeLogin()}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  Username
                </Col>
                <Col sm={8}>
                  <FormControl onChange={(e) => this.onUsernameLoginChange(e)} type="email" placeholder="Username" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={4}>
                  Password
                </Col>
                <Col sm={8}>
                  <FormControl onChange={(e) => this.onPasswordLoginChange(e)} type="password" placeholder="Password" />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onLogin(e)}>Login</Button>
            <Button onClick={() => this.closeLogin()}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showRegisterModal} onHide={() => this.closeRegister()}>
          <Modal.Header closeButton>
            <Modal.Title>Register as a New User!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  First name
                </Col>
                <Col sm={8}>
                  <FormControl onChange={(e) => this.onFirsNameRegChange(e)} type="text" placeholder="First name" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  Last name
                </Col>
                <Col sm={8}>
                  <FormControl onChange={(e) => this.onLastNameRegChange(e)} type="text" placeholder="Last name" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                  Username
                </Col>
                <Col sm={8}>
                  <FormControl onChange={(e) => this.onUsernameRegChange(e)} type="text" placeholder="Username" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={4}>
                  Password
                </Col>
                <Col sm={8}>
                  <FormControl onChange={(e) => this.onPasswordRegChange(e)} type="password" placeholder="Password" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={4}>
                  Repeat password
                </Col>
                <Col sm={8}>
                  <FormControl type="password" placeholder="Repeat password" />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onRegister(e)}>Register</Button>
            <Button onClick={() => this.closeRegister()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Welcome;
