import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchCommunitiesList from '../components/SearchCommunitiesList';
import styles from '../assets/stylesheets/communitiessearch.less';
import axios from 'axios';
import { getAllCommunities } from '../actions/getAllCommunities';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateCommunityModal from '../components/CreateCommunityModal';

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
          <div className="create-community-button"><CreateCommunityModal /></div>
          <h1 className="title">Join a community</h1>
        </div>
        <SearchCommunitiesList communities={this.props.allCommunities}/>
        <Footer />
      </div>
    );
  }
}

CommunitySearch.propTypes = {
  getAllCommunitiesDispatch: PropTypes.func,
  allCommunities: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    allCommunities: state.allCommunities.communities
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCommunitiesDispatch: () => dispatch(getAllCommunities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunitySearch);
