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
        <Button className="login-button">Login</Button>
        <Button className="register-button">Register</Button>
      </div>
    )
  }
}

export default Welcome;