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
import { connect } from 'react-redux';

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
      repeatPassword: '',
      fName: '',
      lName: '',
      failure: '',
      checkUsername: '',
      helpBlock: '',
      loginFailure: '',
      registerFailure: ''
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
    axios.post('/login', {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
    })
    .then((resp) => {
      if (resp.data.success) {
        console.log('Logged in!');
        this.closeLogin();
        this.props.history.push('/profile');
        console.log(resp);
        this.props.onSuccessfulLogin(resp.data.user);
      }
    })
    .catch((err) => {
      console.log('Error loggin in:', err);
      this.setState({loginFailure: "Wrong username or password"});
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

  onRepeatPasswordChange(e) {
    this.setState({repeatPassword: e.target.value});
  }

  onFirstNameRegChange(e) {
    this.setState({fName: e.target.value});
  }

  onLastNameRegChange(e) {
    this.setState({lName: e.target.value});
  }

  onRegister(e) {
    e.preventDefault();
    console.log('trying to reg');
    axios.post(process.env.DOMAIN + '/register', {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.usernameReg,
      password: this.state.passwordReg,
      email: this.state.email
    })
    .then((resp) => {
      console.log('HERE');
      if (resp.data.success) {
        console.log('Successful registration:', resp.data);
        this.closeRegister();
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

   // checks with database to see if username already exists
  checkUsername() {
    axios.get('http://localhost:3000/api/users')
    .then((resp) => {
      var usernames = resp.data.users.map(user => user.username);
      if (usernames.indexOf(this.state.usernameReg) === -1 && this.state.usernameReg.trim(' ') !== '') {
        this.setState({checkUsername: 'success'});
        this.setState({helpBlock: "You're good to go!"});
      }
      else if (this.state.usernameReg.trim(' ') === '') {
        this.setState({checkUsername: 'error'});
        this.setState({helpBlock: 'Username is required'});
      }
      else  {
        this.setState({checkUsername: 'error'});
        this.setState({helpBlock: 'Username already exists'});
      }
    });
  }

  validateUsername() {
    // this.checkUsername();
    return this.state.checkUsername;
  }

  validatePassword() {
    if (this.state.passwordReg.length >= 6) {
      return 'success';
    }
    return 'error';
  }

  validateMatchPassword() {
    if (this.state.passwordReg === this.state.repeatPassword) {
      return 'success';
    }
    return 'error';
  }

  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-splash">
          <h1 className="welcome-title">Welcome to Doorstep</h1>
          <Button
            className="login-button"
            bsStyle="primary"
            bsSize="large"
            onClick={() => this.openLogin()}
          >Login
          </Button>
          <Button
            className="register-button"
            bsStyle="primary"
            bsSize="large"
            onClick={() => this.openRegister()}
          >Register
          </Button>
        </div>
        <Modal show={this.state.showLoginModal} onHide={() => this.closeLogin()}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="col-xs-9 col-xs-offset-3">
                <div id="loginFailure">{this.state.loginFailure}</div>
              </div>
            </div>
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
            <form>
              <FormGroup
               controlId="fName"
               validationState={this.validateFirstName()}>
               <ControlLabel>First Name</ControlLabel>
               <FormControl
                 type="text"
                 placeholder="ex. Cecilia"
                 onChange={(e) => this.onFirstNameRegChange(e)}
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
                  placeholder="ex. Yu"
                  onChange={(e) => this.onLastNameRegChange(e)}
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
                  placeholder="ex. cyu@gmail.com"
                  onChange={(e) => this.onEmailChange(e)}
               />
               <FormControl.Feedback />
               <HelpBlock>Email is required</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="username"
                validationState={this.validateUsername()}>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="ex. icyu"
                  onChange={(e) => this.onUsernameRegChange(e)}
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.helpBlock}</HelpBlock>
              </FormGroup>
              <FormGroup
                 controlId="password"
                 validationState={this.validatePassword()}>
                 <ControlLabel>Password</ControlLabel>
                 <FormControl
                   type="password"
                   onChange={(e) => this.onPasswordRegChange(e)}
                 />
                 <FormControl.Feedback />
                 <HelpBlock>Password must be at least 6 characters</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="repeatPassword"
                validationState={this.validateMatchPassword()}>
                <ControlLabel>Repeat Password</ControlLabel>
                <FormControl
                  type="password"
                  onChange={(e) => this.onRepeatPasswordChange(e)}
                />
                <FormControl.Feedback />
                <HelpBlock>Must match your password</HelpBlock>
              </FormGroup>
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

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSuccessfulLogin: (user) => {
      dispatch({ type: 'SAVE_USER', user })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Welcome);
