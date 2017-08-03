import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import MembersList from '../components/MembersList';
import styles from '../assets/stylesheets/communityprofile.less';

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="community-profile-page">
        <Navbar />
        <div className="community-splash">
          <h1 className="title">COMMUNITY PROFILE</h1>
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
        <MembersList />
        <Footer />
      </div>
    )
  }
}

export default CommunityProfile;