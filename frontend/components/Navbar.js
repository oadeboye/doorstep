import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  logoutUser() {
    axios.get('http://localhost:3000/api/auth/logout')
    .then(resp => {
      console.log(resp);
      this.props.onLogout();
    })
  }

  render() {
    return (
      <div className="navbar">
        <div className="corner-logo">Doorstep</div>
        <div className="profile nav-item">Profile</div>
        <Link to={'/search'} className="nav-item-link"><div className="nav-item">Search Communities</div></Link>
        <Link to={'/'} className="nav-item-link"><div className="nav-item" onClick={() => this.logoutUser()}>Logout</div></Link>
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

