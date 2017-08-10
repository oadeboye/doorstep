import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RequestsBar from '../components/RequestsBar';
import Market from '../components/Market';
import CommunitiesList from '../components/CommunitiesList';
import styles from '../assets/stylesheets/communitymarket.less';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOneCommunity } from '../actions/getOneCommunity';

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.communityId,
      community: {}
    };
  }

  componentDidMount() {
    this.props.getOneCommunity(this.props.match.params.communityId);
  }

  updateRequests() {
    console.log('updating requests');
  }

  render() {
    return (
      <div className="community-market-page">
        <Navbar />
        <div className="market-splash">
          <div className="titles-wrapper">
          {
            this.props.currentComm.pending ? <h1></h1> :
            <h1 className="community-title">{this.props.currentComm.community.name}</h1>
          }
            <h3 className="title">MARKET</h3>
          </div>
          <Link to={'/community/profile/' + this.props.match.params.communityId}><div className="view-community-button">View Profile</div></Link>
          <div className="give-item-button">Give an Item</div>
        </div>
        <RequestsBar commId={this.state.id}/>
        <Market community={this.state.community}/>
        <Footer />
      </div>
    );
  }
}

CommunityMarket.propTypes = {
  match: PropTypes.object,
  currentComm: PropTypes.object,
  getOneCommunity: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    currentComm: state.currentComm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneCommunity: (communityId) => dispatch(getOneCommunity(communityId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityMarket);
