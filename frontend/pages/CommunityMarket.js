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
import { getOneCommunity } from '../actions/getOneCommunity';
import styles from '../assets/stylesheets/communitymarket.less';

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOneCommunityDispatch(this.props.match.params.communityId);
  }

  updateRequests() {
    console.log('updating requests');
  }

  render() {
    const ready = this.props.pending;
    console.log('ready?', ready);
    return (
      <div className="community-market-page">
        <Navbar />
        { !this.props.pending ?
          <div>
            <div className="market-splash">
              <div className="titles-wrapper">
                  <h1 className="community-title">{this.props.community.name}</h1>
                <h3 className="title">MARKET</h3>
              </div>
              <Link to={'/community/profile/' + this.props.match.params.communityId}><div className="view-community-button">View Profile</div></Link>
              <div className="give-item-button">
                <AddItemModal />
              </div>
            </div>
            <RequestsBar commId={this.props.community._id} community={this.props.community}/>
            <Market />
            <Footer />
          </div> :
          <h1 className="loader">Loading...</h1>
        }
      </div>
    );
  }
}

CommunityMarket.propTypes = {
  community: PropTypes.object,
  pending: PropTypes.bool,
  getOneCommunityDispatch: PropTypes.func,
  match: PropTypes.object
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
