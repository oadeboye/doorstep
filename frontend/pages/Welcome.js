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
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { saveUser } from '../actions/saveUser';
import getAllCommunities from '../actions/getAllCommunities';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

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
      validateUser: '',
      helpBlock: '',
      loginFailure: '',
      registerFailure: '',
      usernames: [],
      phone: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/users')
    .then((resp) => {
      var usernames = resp.data.users.map((user) => user.username);
      this.setState({usernames: usernames});
    })
    .catch((err) => {
      console.log(err);
    });
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
    this.props.onSuccessfulLogin(this.state.usernameLogin, this.state.passwordLogin);
    console.log("P", this.props.user)
    if (!this.props.user) {
      swal({
        title: "Error logging",
        text: "Your username or password is incorrect.",
        type: "error"
      })
    }
    else {
      this.props.history.push('/profile');
    }
  }

  closeRegister() {
    this.setState({ showRegisterModal: false });
  }

  openRegister() {
    this.setState({ showRegisterModal: true });
  }

  // checks with database to see if username already exists
  checkUsername() {
    var usernames = this.state.usernames;
    if (usernames.indexOf(this.state.usernameReg) === -1 && this.state.usernameReg.trim(' ') !== '') {
      this.setState({validateUser: 'success', helpBlock: "You're good to go!"});
    } else if (this.state.usernameReg.trim(' ') === '') {
      this.setState({validateUser: 'error', helpBlock: 'Username is required'});
    } else  {
      this.setState({validateUser: 'error', helpBlock: 'Username already exists'});
    }
  }

  onUsernameRegChange(e) {
    this.setState({usernameReg: e.target.value}, () =>
      this.checkUsername());
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

  onPhoneChange(e) {
    this.setState({phone: e.target.value});
  }

  onRegister(e) {
    e.preventDefault();
    var phone = (this.state.phone.startsWith('+1') ? this.state.phone : '+1' + this.state.phone);
    axios.post('http://localhost:3000/api/auth/register', {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.usernameReg,
      password: this.state.passwordReg,
      email: this.state.email,
      phone
    })
    .then((resp) => {
      if (resp.data.success) {
        swal({
          title: "Success",
          text: "Welcome to Doorstep! Go ahead and login.",
          type: "success"
        })
        this.closeRegister();
      }
      else {
        swal({
          title: "Error Registering",
          text: "Please make sure the form is correctly filled out.",
          type: "error"
        })
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

  validatePhone() {
    if (this.state.phone.length >= 10) {
      return 'success';
    }
    return 'warning';
  }

   // checks with database to see if username already exists
  checkUsername() {
    axios.get('http://localhost:3000/api/users')
    .then((resp) => {
      var usernames = resp.data.users.map(user => user.username);
      if (usernames.indexOf(this.state.usernameReg) === -1 && this.state.usernameReg.trim(' ') !== '') {
        this.setState({checkUsername: 'success'});
        this.setState({helpBlock: "You're good to go!"});
      } else if (this.state.usernameReg.trim(' ') === '') {
        this.setState({checkUsername: 'error'});
        this.setState({helpBlock: 'Username is required'});
      } else  {
        this.setState({checkUsername: 'error'});
        this.setState({helpBlock: 'Username already exists'});
      }
    });
  }

  validateUsername() {
    return this.state.validateUser;
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
            <Modal.Title className="modal-title">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="col-xs-9 col-xs-offset-3">
                <div id="loginFailure">{this.state.loginFailure}</div>
              </div>
            </div>
            <Form horizontal >
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
            <Button className="modal-button-orange" type="submit" onClick={(e) => this.onLogin(e)}>Login</Button>
            <Button className="modal-button-red" onClick={() => this.closeLogin()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showRegisterModal} onHide={() => this.closeRegister()}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Register</Modal.Title>
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
                validationState={this.validateUsername()}
              >
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
              <FormGroup
                controlId="phone"
                validationState={this.validatePhone()}>
                <ControlLabel>Phone number</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="2035556666"
                  onChange={(e) => this.onPhoneChange(e)}
                />
                <FormControl.Feedback />
                <HelpBlock>Phone number must contain 10 digits (optional)</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-button-blue" onClick={(e) => this.onRegister(e)}>Register</Button>
            <Button className="modal-button-red" onClick={() => this.closeRegister()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSuccessfulLogin: (username, password) => {
      dispatch(saveUser(username, password));
    }
  };
};

Welcome.propTypes = {
  onSuccessfulLogin: PropTypes.func,
  history: PropTypes.array,
  user: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Welcome);
