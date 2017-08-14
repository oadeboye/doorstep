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
import styles from '../assets/stylesheets/communitymarket.less';
import AddItemModal from '../components/modals/AddItemModal';
import { getOneCommunity } from '../actions/getOneCommunity';

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('COMMUNITY MARKET ID', this.props.match.params.communityId);
    this.props.getOneCommunityDispatch(this.props.match.params.communityId);
    console.log('COMMUNITY DID MOUNT IN COMMUNITY MARKET', this.props.community);
  }

  updateRequests() {
    console.log('updating requests');
  }

  render() {
    console.log('ID in COMM MARKET', this.props.community);
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
            <RequestsBar commId={this.props.community._id} community={this.props.community}/>
            <Market />
        <Footer />
      </div>
    );
  }
}

CommunityMarket.propTypes = {
  community: PropTypes.object,
  pending: PropTypes.bool,
  getOneCommunityDispatch: PropTypes.func
};

const mapStateToProps = ( state ) => {
  return {
    community: state.currentComm.community,
    pending: state.currentComm.pending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneCommunityDispatch: (communityId) => dispatch(getOneCommunity(communityId))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(CommunityMarket);
