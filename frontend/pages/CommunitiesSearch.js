import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchCommunitiesList from '../components/SearchCommunitiesList';
import styles from '../assets/stylesheets/communitiessearch.less';
import axios from 'axios';
import { getAllCommunities } from '../actions/getAllCommunities';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommunitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: []
    };
  }

  componentDidMount() {
    this.props.getAllCommunitiesDispatch();
  }

  render() {
    return (
      <div className="communities-search-page">
        <Navbar />
        <div className="search-splash">
          <div className="create-community-button">Create a community</div>
          <h1 className="title">Join a community</h1>
        </div>
        <SearchCommunitiesList communities={this.props.allCommunities.data}/>
        <Footer />
      </div>
    );
  }
}

CommunitySearch.propTypes = {
  getAllCommunitiesDispatch: PropTypes.func,
  allCommunities: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    allCommunities: state.allCommunities
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCommunitiesDispatch: () => dispatch(getAllCommunities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunitySearch);
