import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import EditUserModal from '../components/modals/EditUserModal';
import styles from '../assets/stylesheets/userprofile.less';

const UserProfile = ({ user, pending, saveUserEdits }) => {
  const ready = user && !pending;
  return (
    <div className="user-profile-page">
      <Navbar />
      <div className="profile-wrapper">
        <div className="door-tag">
          <img alt="user" src={user.imgURL || "http://dl.hiapphere.com/data/icon/201511/HiAppHere_com_com.ludicside.mrsquare.png"} />
          <h2 className="name">{user.fName + ' ' + user.lName}</h2>
        </div>
        <div className="user-profile-splash">
          <div className="edit-profile-button">
            { ready ?
              <EditUserModal
              />
              :
              <p>Load</p>
            }
          </div>
          <h1 className="profile-title">YOUR PROFILE</h1>
        </div>
        <div className="user-info">
          <div className="info-box">
            <div className="about-me">
              <h3>{user.aboutMe}</h3>
            </div>
            <div className="stats-box">
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        ready ? <CommunitiesList /> : <h1 className="loader">Loading...</h1>
      }
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    pending: state.user.pending
  };
};

UserProfile.propTypes = {
  user: PropTypes.object,
  saveUserEdits: PropTypes.func,
  pending: PropTypes.bool
};


export default connect(
  mapStateToProps
)(UserProfile);
