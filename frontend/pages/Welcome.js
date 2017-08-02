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
         Form } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showRegisterModal: false,
      usernameLogin: '',
      passwordLogin: '',
      usernameReg: '',
      email: '',
      passwordReg: '',
      fName: '',
      lName: '',
      failure: ''
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

  onEmailChange(e) {
    this.setState({email: e.target.value});
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
        this.closeRegister();
      } else {
        console.log(resp.data.failure);
        resp.data.failure.forEach(failure => {
          var p = document.createElement("p");
          var textnode = document.createTextNode(failure.msg);
          p.appendChild(textnode);
          document.getElementById("failureMsg").appendChild(p);
        });
      }
    })
    .catch((err) => {
      console.log('Error registering', err);
    });
  }

  onProfileClick(e) {
    e.preventDefault();
    this.props.history.push('/profile');
  }

  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-splash">
          <h1 className="welcome-title">Welcome to Doorstep</h1>
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
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={(e) => this.onProfileClick(e)}
          >Go to profile page
          </Button>
        </div>
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
                  <FormControl onChange={(e) => this.onUsernameLoginChange(e)} type="text" placeholder="Username" />
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
            <div className="form-group">
              <div className="col-xs-9 col-xs-offset-3">
                <div id="failureMsg"/>
              </div>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="firstName" className="control-label">First name</label>
                <input onChange={(e) => this.onFirsNameRegChange(e)} type="text" className="form-control" id="fName" placeholder="First Name" required/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="control-label">Last name</label>
                <input onChange={(e) => this.onLastNameRegChange(e)} type="text" className="form-control" id="lName" placeholder="Last Name" required/>
              </div>
              <div className="form-group">
                <label htmlFor="Username" className="control-label">Username</label>
                <input onChange={(e) => this.onUsernameRegChange(e)} type="text" className="form-control" id="username" placeholder="Username" required/>
                <div className="help-block with-errors">Username is required *</div>
              </div>
              <div className="form-group">
                <label htmlFor="Email" className="control-label">Email</label>
                <input onChange={(e) => this.onEmailRegChange(e)} type="email" className="form-control" id="email" placeholder="Email" required/>
                <div className="help-block with-errors">Email is required *</div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="control-label">Password</label>
                <div className="form-inline row">
                  <div className="form-group col-sm-6">
                    <input onChange={(e) => this.onPasswordRegChange(e)} type="password" className="form-control" id="inputPassword" placeholder="Password" required/>
                    <div className="help-block">Minimum of 6 characters *</div>
                  </div>
                  <div className="form-group col-sm-6">
                    <input type="password" className="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="Whoops, these don't match" placeholder="Confirm" required/>
                  </div>
                </div>
              </div>
            </form>
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
