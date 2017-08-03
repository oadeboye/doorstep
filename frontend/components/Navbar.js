import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  logoutUser() {
    axios.get('http://localhost:3000/logout')
    .then(resp => {
      console.log(resp);
      this.props.onLogout();
      this.props.history.push('/');
    })
  }

  render() {
    return (
      <div className="navbar">
        <div className="corner-logo">Doorstep</div>
        <div className="profile nav-item">Profile</div>
        <div className="nav-item" onClick={() => this.logoutUser()}>Logout</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (user) => {
      dispatch({ type: 'LOGOUT_USER', user })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Navbar)

