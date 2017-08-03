import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import styles from '../assets/stylesheets/communityprofile.less';

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="community-market-page">
        <Navbar />
        <Footer />
      </div>
    )
  }
}

export default CommunityMarket;