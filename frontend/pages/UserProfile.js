import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import styles from '../assets/stylesheets/userprofile.less';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("USER: ", this.props.user.fName);
    return (
      <div className="user-profile-page">
        <Navbar />
        <div className="profile-wrapper">
          <div className="door-tag">
            <img src='http://dl.hiapphere.com/data/icon/201511/HiAppHere_com_com.ludicside.mrsquare.png' />
            <h2 className="name">{this.props.user.fName + ' ' + this.props.user.lName}</h2>
          </div>
          <div className="user-profile-splash">
            <h1 className="profile-title">YOUR PROFILE</h1>
          </div>
          <div className="user-info">
            <div className="info-box">
              <div className="about-me">
                <h3>Hello! I am cool.</h3>
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
        <CommunitiesList />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

export default connect(
  mapStateToProps
  )(UserProfile);
