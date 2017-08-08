import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import MembersList from '../components/MembersList';
import EditCommunityModal from '../components/EditCommunityModal';
import styles from '../assets/stylesheets/communityprofile.less';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneCommunity } from '../actions/getOneCommunity';

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: {}
    };
  }

  componentDidMount() {
    this.props.getOneCommunity(this.props.match.params.communityId);
    // axios.get('http://localhost:3000/api/community/' + this.props.match.params.communityId)
    // .then((responseJson) => {
    //   this.setState({
    //     community: responseJson.data,
    //     loaded: true
    //   });
    // })
    // .catch((err) => {
    //   console.log("ERROR ON MOUNT ON COMMUNITY PROFILE PAGE", err);
    // });
  }

  handleAddUsers(user) {
    var users = this.state.community.users.concat(user);
    var newComm = Object.assign({}, this.state.community, {users});
    this.setState({community: newComm});
  }

  onCommunityEdit(editObj) {
    const commId = this.state.community._id;
    axios.post('http://localhost:3000/api/edit-community/' + commId, editObj)
    .then((respJson) => {
      this.setState({ commmunity: respJson.data.commmunity });
    })
    .catch((err) => {
      console.log("ERROR SUBMITTING COMMUNITY PROFILE EDITS", err);
    });
  }

  render() {
    console.log('CURRENT COMM', this.props.currentComm);
    return (
      <div className="community-profile-page">
        <Navbar />
        <div className="community-splash">
          <div className="edit-profile-button">
            {
              this.state.loaded ?
              <EditCommunityModal
                community={this.state.community}
                onCommunityEdit={(edits) => this.onCommunityEdit(edits)}
              />
              :
              <p>Edit Community Profile</p>
            }
          </div>
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
            <Link to={'/community/' + this.props.match.params.communityId}>
            <div className="market-button">Go to Marketplace</div>
            </Link>
          </div>
          {
            this.props.currentComm.pending ? <h1>Loading...</h1> : <h1>Working</h1>
          // (<MembersList
          //   handleAddUsers={this.handleAddUsers.bind(this)}
          //   commId={this.props.match.params.communityId}
          //   commUsers={this.props.currentComm.community.users} />)
          }
          <Footer />
        </div>
      </div>
    );
  }
}

CommunityProfile.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityProfile);
