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

class CommunityMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.communityId,
      community: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/community/' + this.state.id)
    .then((responseJson) => {
      this.setState({community: responseJson.data});
    })
    .catch((err) => {
      console.log("SOMETHING WENT WRONG IN MARKETPLACE", err);
    });
  }

  updateRequests() {
    console.log('updating requests');
  }

  render() {
    return (
      <div className="community-market-page">
        <Navbar />
        <div className="market-splash">
          <h1 className="market-title">{this.state.community.name || 'Community Market'}</h1>
          <Link to={'/community/profile/' + this.props.match.params.communityId}><div className="view-community-button">View Profile</div></Link>
          <div className="give-item-button">Give an Item</div>
        </div>
        <RequestsBar commId={this.state.id} handleRequest={this.updateRequests.bind(this)} requests={this.state.community.requests}/>
        <Market community={this.state.community}/>
        <Footer />
      </div>
    );
  }
}

CommunityMarket.propTypes = {
  match: PropTypes.object
};

export default CommunityMarket;
