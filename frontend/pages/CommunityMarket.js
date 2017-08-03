import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RequestsBar from '../components/RequestsBar';
import Market from '../components/Market';
import CommunitiesList from '../components/CommunitiesList';
import styles from '../assets/stylesheets/communitymarket.less';

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="community-market-page">
        <Navbar />
        <div className="market-splash">
          <h1 className="market-title">Community Market</h1>
          <div className="view-community-button">View Profile</div>
          <div className="give-item-button">Give an Item</div>
        </div>
        <RequestsBar />
        <Market />
        <Footer />
      </div>
    )
  }
}

export default CommunityMarket;