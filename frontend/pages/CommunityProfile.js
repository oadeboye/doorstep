import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import MembersList from '../components/MembersList';
import EditCommunityModal from '../components/modals/EditCommunityModal';
import styles from '../assets/stylesheets/communityprofile.less';
import { connect } from 'react-redux';
import { getOneCommunity } from '../actions/getOneCommunity';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('HELLO');
    this.props.getOneCommunity(this.props.match.params.communityId);
  }

  render() {
        console.log('CURRENT COMM', this.props.currentComm);
    return (
      <div className="community-profile-page">
        <Navbar />
        {this.props.pending && this.props.currentComm.name ? <div className="loader">Loading...</div> :
        <div className="community-splash">
          {
            !this.props.pending ?
            // <button className="edit-profile-button">
              <EditCommunityModal
              community={this.props.currentComm}
              />
          // </button>
            :
            <button className="edit-profile-button">Edit Community Profile</button>
          }
          <h1 className="community-title">{this.props.currentComm.name}</h1>
          <h3 className="title">COMMUNITY PROFILE</h3>
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
          <Link to={'/community/' + this.props.match.params.communityId}>
          <div className="market-button">Go to Marketplace</div>
          </Link>
        </div>}
        {
          this.props.pending ? <h1>Loading...</h1> :
          <div>
            <div>{this.props.currentComm.description}</div>
            <MembersList
              commId={this.props.match.params.communityId}/>
          </div>
        }
        <Footer />
      </div>
    );
  }
}

CommunityProfile.propTypes = {
  match: PropTypes.object,
  currentComm: PropTypes.object,
  getOneCommunity: PropTypes.func,
  pending: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    currentComm: state.currentComm.community,
    pending: state.currentComm.pending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneCommunity: (communityId) => dispatch(getOneCommunity(communityId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityProfile);
