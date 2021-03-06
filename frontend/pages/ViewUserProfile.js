import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchCommunitiesList from '../components/SearchCommunitiesList';
import styles from '../assets/stylesheets/userprofile.less';

class ViewUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentDidMount() {
    axios.get('/api/profile/' + this.props.match.params.userId)
    .then((response) => {
      this.setState({
        user: response.data.user
      }, () => console.log("DONE"));
    });
  }

  render() {
    const user = this.state.user;
    return (
      <div>
        <Navbar />
        {
          this.state.user === '' ? (<p className="loader">Loading...</p>)
          :
          (
            <div className="user-profile-page">
              <div className="profile-wrapper">
                <div className="door-tag">
                  <img alt="user" src={user.imgURL || "http://dl.hiapphere.com/data/icon/201511/HiAppHere_com_com.ludicside.mrsquare.png"} />
                  <h2 className="name">{user.fName + ' ' + user.lName}</h2>
                </div>
                <div className="viewed-user-profile-splash" />
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
              <SearchCommunitiesList communities={user.communities}/>
            </div>
          )
        }
        <Footer />
      </div>
    );
  }
}

ViewUserProfile.propTypes = {
  match: PropTypes.object
};

export default ViewUserProfile;
