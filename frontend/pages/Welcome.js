import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-splash">
          <h1 className="welcome-title">Welcome to Doorstep</h1>
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    )
  }
}

export default Welcome;
