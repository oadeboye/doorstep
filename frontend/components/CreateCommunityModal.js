import React from 'react';
import { Modal,
         Form,
         FormGroup,
         Col,
         FormControl,
         ControlLabel,
         Button,
         FieldGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

class CreateCommunityModal extends React.Component {
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
    return (
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
    );
  }
}

CreateCommunityModal.propTypes = {
  user: PropTypes.object
};

export default CreateCommunityModal;
