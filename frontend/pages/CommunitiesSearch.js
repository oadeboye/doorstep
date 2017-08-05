import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchCommunitiesList from '../components/SearchCommunitiesList';
import styles from '../assets/stylesheets/communitiessearch.less';
import axios from 'axios';

class CommunitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: []
    }
  }

  componentDidMount() {
    console.log("HERE");
    axios.get('http://localhost:3000/api/communities/all')
    .then((response) => {
      console.log(response);
      console.log("COMMUNITIES ALL", response.data.communities);
      this.setState({
        communities: response.data.communities
      })
    })
    .catch(err => {
      console.log("Error getting all the communities", err);
    })
  }

  render() {
    return (
      <div className="communities-search-page">
        <Navbar />
        <div className="search-splash">
          <div className="create-community-button">Create a community</div>
          <h1 className="title">Join a community</h1>
        </div>
        <SearchCommunitiesList communities={this.state.communities}/>
        <Footer />
      </div>
    )
  }
}

export default CommunitySearch;