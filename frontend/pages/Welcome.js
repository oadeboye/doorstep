import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="welcome-page">
        <button className="login-button">Login</button>
        <button className="register-button">Register</button>
      </div>
    )
  }
}

export default Welcome;
