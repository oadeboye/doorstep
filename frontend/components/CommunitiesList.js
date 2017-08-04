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

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      communityName: '',
      member: '',
      userCommunities: [],
      userHasCommunities: false
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/communities/' + this.props.user._id)
    .then((responseJson) => {
      const communities = responseJson.data;
      this.setState({
        userCommunities: communities,
        userHasCommunities: true
      });
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

  onAddMembersChange(e) {
    this.setState({member: e.target.value});
  }

  onCreate(e) {
    e.preventDefault();
    console.log('creating a new community');
    console.log('community name', this.state.communityName);
    console.log('community desc', this.state.desc);
    axios.post('http://localhost:3000/api/community', {
      name: this.state.communityName,
      description: this.state.desc
    })
    .then((resp) => {
      if (resp.data.success) {
        console.log('SUCCESSFULLY CREATED A NEW COMMUNITY');
        console.log(resp.data.response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    this.close();
  }


  render() {
    return (
      <div className="communities-list">
      {
        this.props.fromSearch ?
        (<div className="search">
          <div className="searchbar">
            <input className="search-input"/>
            <div className="search-button">Search</div>
          </div>
          <div className="sortbar">
          </div>
        </div>
        )
        :
        <button onClick={(e) => this.onCreateCommunity(e)} className="add-community-button">Create a community</button>
      }
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
              <ControlLabel>Members</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter a username"
                onChange={(e) => this.onAddMembersChange(e)}
              />
              <Button componentClass={ControlLabel} sm={4}>
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
        <div className="communities-box">
          {this.state.userCommunities.map((com, index) =>
            <Door key={index} com={com} />)}
          {/* <Door fromSearch={this.props.fromSearch}/>
          <Door fromSearch={this.props.fromSearch}/>
          <Door fromSearch={this.props.fromSearch}/> */}
        </div>
      </div>
    );
  }
}

CommunitiesList.propTypes = {
  user: PropTypes.object,
};

export default CommunitiesList;
