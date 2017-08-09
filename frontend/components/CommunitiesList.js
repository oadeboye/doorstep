import React from 'react';
import Door from './Door';
import { Modal,
         Form,
         FormGroup,
         Col,
         FormControl,
         ControlLabel,
         Button,
         FieldGroup } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsersCommunities } from '../actions/getUsersCommunities';
import CreateCommunityModal from './CreateCommunityModal';
import domain from '../domain';

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUsersCommunitiesDispatch(this.props.user._id);
  }

  render() {
    console.log("HERE", this.props.usersCommunities);
    return (
      <div className="communities-list">
        <div className="create-community-button">
          <CreateCommunityModal />
        </div>
        <h2>Communities</h2>
          {
            !this.props.usersCommunities.pending ?
            <div className="communities-box">
            {this.props.usersCommunities.data.map((com, index) =>
              <Door key={index} com={com} isMember/>)}
            </div>
            :
            <div className="communities-box"><h1 className="loader">Loading...</h1></div>
          }
      </div>
    );
  }
}

CommunitiesList.propTypes = {
  user: PropTypes.object,
  usersCommunities: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    usersCommunities: state.usersCommunities
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsersCommunitiesDispatch: (userId) => dispatch(getUsersCommunities(userId))
  };
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(CommunitiesList);
