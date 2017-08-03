import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import styles from '../assets/stylesheets/communitiessearch.less';

class CommunitySearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="communities-search-page">
        <Navbar />
        <div className="search-splash">
          <div className="create-community-button">Create a community</div>
          <h1 className="title">Join a community</h1>
        </div>
        <CommunitiesList fromSearch/>
        <Footer />
      </div>
    )
  }
}

export default CommunitySearch;