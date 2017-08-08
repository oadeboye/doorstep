import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import domain from '../domain';

class Navbar extends React.Component {
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
        <Link to={'/profile'} className="nav-item-link"><div className="nav-item">Your Profile</div></Link>
        <Link to={'/search'} className="nav-item-link"><div className="nav-item">Search Communities</div></Link>
        <Link to={'/'} className="nav-item-link"><div className="nav-item" onClick={() => this.logoutUser()}>Logout</div></Link>
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

Navbar.propTypes = {
  onLogout: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
