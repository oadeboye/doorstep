import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesList from '../components/CommunitiesList';
import MembersList from '../components/MembersList';
import styles from '../assets/stylesheets/communityprofile.less';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: {}
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/api/community/' + this.props.match.params.communityId)
    .then((responseJson) => {
      console.log("COMMUNITY PROFILE DATA", responseJson.data);
      this.setState({community: responseJson.data});
    })
    .catch((err) => {
      console.log("ERROR ON MOUNT ON COMMUNITY PROFILE PAGE", err);
    });
  }

  render() {
    console.log("COMMUNITY DATA", this.state.community);
    return (
      <div className="community-profile-page">
        <Navbar />
        <div className="community-splash">
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
          </div>
          <Link to={'/community/' + this.props.match.params.communityId}>
          <Button
            // className="-button"
            bsStyle="primary"
            bsSize="large"
          >Open Doorstep
          </Button>
          </Link>
        </div>
        <MembersList commUsers={this.state.community.users}/>
        <Footer />
      </div>
    );
  }
}

export default CommunityProfile;
