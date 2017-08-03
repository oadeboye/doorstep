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

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      communityName: '',
      desc: ''
    };
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

  onCommunityDescChange(e) {
    this.setState({desc: e.target.value});
  }

  onCreate(e) {
    e.preventDefault();
    console.log('creating a new community');
    console.log('community name', this.state.communityName);
    console.log('community desc', this.state.desc);
    axios.post('http://localhost:3000/community', {
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
            <FormGroup controlId="description">
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea"
                placeholder="ex. This is a community for 7th St goofballs"
                onChange={(e) => this.onCommunityDescChange(e)}/>
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
          <Door />
          <Door />
          <Door />
        </div>
      </div>
    );
  }
}

export default CommunitiesList;
