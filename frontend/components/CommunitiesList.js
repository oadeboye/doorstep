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

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      communityName: '',
      member: ''
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

  onAddMembersChange(e) {
    this.setState({member: e.target.value});
  }

  onCreate(e) {
    e.preventDefault();
    console.log('creating a new community');
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
          <Door />
          <Door />
          <Door />
        </div>
      </div>
    );
  }
}

export default CommunitiesList;
