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

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      communityName: '',
      communityDescription: '',
      member: '',
      userCommunities: [],
      userHasCommunities: false,
      loaded: false
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/api/communities/' + this.props.user._id)
    .then((responseJson) => {
      const communities = responseJson.data;
      this.setState({
        userCommunities: communities,
        userHasCommunities: true,
        loaded: true
      }, () => (console.log("CALLBACKS")));
    })
    .catch((err) => {
      console.log("SOMETHING WENT WRONG WITH COMMUNITIES LIST", err);
    });
  }

  componentWillReceiveProps(props) {
    axios.get('http://localhost:3000/api/communities/' + props.user._id)
    .then((responseJson) => {
      const communities = responseJson.data;
      this.setState({
        userCommunities: communities,
        userHasCommunities: true,
        loaded: true
      }, () => (console.log("CALLBACKS")));
    })
    .catch((err) => {
      console.log("SOMETHING WENT WRONG WITH COMMUNITIES LIST", err);
    });
  }

  onCreateCommunity(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onCommunityNameChange(e) {
    this.setState({communityName: e.target.value});
  }

  onCommunityDescriptionChange(e) {
    this.setState({communityDescription: e.target.value});
  }

  onAddMembersChange(e) {
    this.setState({member: e.target.value});
  }

  onCreate(e) {
    e.preventDefault();
    console.log('creating a new community');
    console.log('community name', this.state.communityName);
    console.log('community desc', this.state.communityDescription);
    axios.post('http://localhost:3000/api/community', {
      name: this.state.communityName,
      description: this.state.communityDescription,
      owner: this.props.user._id
    })
    .then((resp) => {
      if (resp.data.success) {
        const newUserCommunities = JSON.parse(JSON.stringify(this.state.userCommunities));
        newUserCommunities.push(resp.data.response);
        this.setState({
          userCommunities: newUserCommunities
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
    this.close();
  }


  render() {
    console.log("HERE", this.state.userCommunities);
    return (
      <div className="communities-list">
        <button onClick={(e) => this.onCreateCommunity(e)} className="add-community-button">Create a community</button>
      <Modal show={this.state.showModal} onHide={() => this.close()}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new community!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <ControlLabel>Community name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter name"
                onChange={(e) => this.onCommunityNameChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Community description</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter description"
                onChange={(e) => this.onCommunityDescriptionChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Members</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter a username"
                onChange={(e) => this.onAddMembersChange(e)}
              />
              <Button componentClass={ControlLabel}>
                Add more members
              </Button>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => this.onCreate(e)}>Create a new community</Button>
          <Button onClick={() => this.close()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
        <h2>Communities</h2>
          {
            this.state.loaded ? <div className="communities-box">{this.state.userCommunities.map((com, index) =>
            <Door key={index} com={com} />)}</div>
            :
            <div className="communities-box"><h1>Loading...</h1></div>
          }
      </div>
    );
  }
}

CommunitiesList.propTypes = {
  user: PropTypes.object,
};

export default CommunitiesList;
