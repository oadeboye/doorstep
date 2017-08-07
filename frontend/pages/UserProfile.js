import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import EditUserModal from '../components/EditUserModal';
import styles from '../assets/stylesheets/userprofile.less';

import { editUser } from '../actions/index';

const UserProfile = ({ user, saveUserEdits }) => {
  console.log("USER ID HERE", user._id);
  const onEdit = (editObj) => {
    axios.post('http://localhost:3000/api/edit-profile/' + user._id, editObj)
    .then((resp) => {
      if (resp.data.success) {
        console.log("SUCCESS HERE!");
        saveUserEdits(editObj);
      } else {
        console.log("FAILURE MESSAGE", resp.data.failure);
      }
      console.log("SUCCESSFULLY EDITED USER DATA", user);
    })
    .catch((err) => {
      console.log("ERROR ON EDIT USER MODAL", err);
    });
  };

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
            { user ?
              <EditUserModal
                user={user}
                onEdit={onEdit}
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
      <CommunitiesList user={user}/>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserEdits: (edits) => {
      dispatch(editUser(edits));
    }
  };
};

UserProfile.propTypes = {
  user: PropTypes.object,
  saveUserEdits: PropTypes.func
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(UserProfile);
