import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RequestsBar from '../components/RequestsBar';
import Market from '../components/Market';
import CommunitiesList from '../components/CommunitiesList';
import AddItemModal from '../components/modals/AddItemModal';
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
          <h1 className="market-title">{this.props.community.name || 'Community Market'}</h1>
          <Link to={'/community/profile/' + this.props.community._id}><div className="view-community-button">View Profile</div></Link>
          <div className="give-item-button">
            { this.props.pending ? <p>Give an Item</p> : <AddItemModal />}
            </div>
        </div>
        <RequestsBar commId={this.props.community._id}/>
        <Market />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    community: state.currentComm.community,
    pending: state.currentComm.pending
  };
};

CommunityMarket.propTypes = {
  community: PropTypes.object,
  pending: PropTypes.bool
};

export default connect(
  mapStateToProps
)(CommunityMarket);
