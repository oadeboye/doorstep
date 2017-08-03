import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
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
          <h1>COMMUNITY PROFILE</h1>
          <div className="community-stats">
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default CommunityProfile;