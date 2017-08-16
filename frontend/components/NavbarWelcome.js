import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import domain from '../domain';

class NavbarWelcome extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser() {
    axios.get(domain + '/api/auth/logout')
    .then(resp => {
      this.props.onLogout();
    });
  }

  render() {
    return (
      <div className="navbar">
        <div className="corner-logo">Doorstep</div>
        <a className="nav-item-link" href="#mission"><div className="nav-item">Mission</div></a>
        <a className="nav-item-link" href="#about"><div className="nav-item">About</div></a>
        <a className="nav-item-link" href="#team"><div className="nav-item">Team</div></a>
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
    onLogout: (user) => {
      dispatch({ type: 'LOGOUT_USER', user });
    }
  };
};

NavbarWelcome.propTypes = {
  onLogout: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarWelcome);
