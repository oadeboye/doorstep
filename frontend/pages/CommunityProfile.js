import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import MembersList from '../components/MembersList';
import EditCommunityModal from '../components/modals/EditCommunityModal';
import LeaveCommunityModal from '../components/modals/LeaveCommunityModal';
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

  // handleAddUsers(user) {
  //   var users = this.state.community.users.concat(user);
  //   var newComm = Object.assign({}, this.state.community, {users});
  //   this.setState({community: newComm});
  // }
  //
  // onCommunityEdit(editObj) {
  //   const commId = this.state.community._id;
  //   axios.post('http://localhost:3000/api/edit-community/' + commId, editObj)
  //   .then((respJson) => {
  //     this.setState({ commmunity: respJson.data.commmunity });
  //   })
  //   .catch((err) => {
  //     console.log("ERROR SUBMITTING COMMUNITY PROFILE EDITS", err);
  //   });
  // }

  render() {
    // if (!this.props.user || Object.keys(this.props.user).length === 0) {
    //   this.props.history.push('/');
    // }

    return (
      <div className="community-profile-page">
        <Navbar />
        {this.props.pending && this.props.currentComm.name ? <div className="loader">Loading...</div> :
        <div className="community-splash">
          {
            !this.props.pending ? <div>
              <EditCommunityModal
                community={this.props.currentComm}
              />
              <LeaveCommunityModal
                history={this.props.history} />
            </div>
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
          this.props.pending ? <h1 className="loader">Loading...</h1> :
          <div>
            <div className="about-community">
            <h3>About Us</h3>
            <p>{this.props.currentComm.description}</p>
            </div>
            <MembersList
              commId={this.props.match.params.communityId}
              history={this.props.history}
            />
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
  pending: PropTypes.bool,
  history: PropTypes.array
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
