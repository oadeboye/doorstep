import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RequestsBar from '../components/RequestsBar';
import Market from '../components/Market';
import CommunitiesList from '../components/CommunitiesList';
import styles from '../assets/stylesheets/communitymarket.less';
import axios from 'axios';

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.communityId,
      community: {}
    };
    console.log("FINDING PARAMS", this.props.match);
  }

  componentDidMount() {
    console.log("MOUNTING ON COMMUNITY PROFILE PAGE");
    axios.get('http://localhost:3000/community/' + this.state.id)
    .then((responseJson) => {
      console.log("RECEIVED COMMUNITY INFORMATION ON MARKET PAGE", responseJson);
      this.setState({community: responseJson.data});
    })
    .catch((err) => {
      console.log("SOMETHING WENT WRONG IN MARKETPLACE", err);
    });
  }

  render() {
    console.log("RENDERING COMMUNITY MARKET PLACE", this.state.community);
    return (
      <div className="community-market-page">
        <Navbar />
        <div className="market-splash">
          <h1 className="market-title">{this.state.community.name || 'Community Market'}</h1>
          <div className="view-community-button">View Profile</div>
          <div className="give-item-button">Give an Item</div>
        </div>
        <RequestsBar requests={this.state.community.requests}/>
        <Market community={this.state.community}/>
        <Footer />
      </div>
    );
  }
}

export default CommunityMarket;
