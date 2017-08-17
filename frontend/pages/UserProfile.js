import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import ImageUpload from '../components/ImageUpload';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import EditUserModal from '../components/modals/EditUserModal';
import styles from '../assets/stylesheets/userprofile.less';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log("ts", this.props.user);
  }

render() {
    const user = this.props.user;
    const pending = this.props.pending;
    const saveUserEdits = this.props.pending;
    const ready = user && !pending;

    if (!pending && (!user || Object.keys(user).length === 0)) {
      this.props.history.push('/');
    }

    return (
      <div className="user-profile-page">
        <Navbar />
        {
          ready ?
          <div>
          <div className="profile-wrapper">
            <div className="door-tag">
              <img className="doortag-img" src="/img/doortag.svg" alt="doortag"/>
              <div className="doortag-inner">
                <img className="profile-pic" alt="user" src={user.imgURL || "http://dl.hiapphere.com/data/icon/201511/HiAppHere_com_com.ludicside.mrsquare.png"} />
                <h2 className="name">{user.fName + ' ' + user.lName}</h2>
              </div>
            </div>
            <div className="user-profile-splash">
                <EditUserModal />
              <h1 className="profile-title">YOUR PROFILE</h1>
            </div>
            <div className="user-info">
              <div className="info-box">
                <div className="about-me">
                  <h3>{user.aboutMe}</h3>
                </div>
                  <div className="stats-box">
                    <div className="stat">
                      <h1>{user.stats[0] || 0}</h1>
                      <h3>Given</h3>
                    </div>
                    <div className="stat">
                      <h1>{user.stats[1] || 0}</h1>
                      <h3>Taken</h3>
                    </div>
                    <div className="stat">
                      <h1>{user.stats[2] || 0}</h1>
                      <h3>Communities</h3>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <CommunitiesList history={this.props.history}/>
          {/* <ImageUpload /> */}
          </div>
          :
          <h1 className="loader">Loading...</h1>
        }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    user: state.user.user,
    pending: state.user.pending,
    history: ownProps.history
  };
};

UserProfile.propTypes = {
  user: PropTypes.object,
  saveUserEdits: PropTypes.func,
  pending: PropTypes.bool,
  history: PropTypes.array
};


export default connect(
  mapStateToProps
)(UserProfile);
