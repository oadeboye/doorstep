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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CreateCommunityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      itemName: '',
      imgURL: ''
    };
  }

  onCreateItem(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onItemNameChange(e) {
    this.setState({itemName: e.target.value});
  }

  onImgUrlChange(e) {
    this.setState({imageURL: e.target.value});
  }

  onCreate(e) {
    e.preventDefault();
    this.props);
    this.close();
  }

  navigateToCommunityProfile() {
    console.log("CLEARING");
    this.props.();
  }

  render() {
    return (
      <div>
        {
          this.props.createCommunityStatus.success &&
           <Modal show>
            <Modal.Title>Community Created</Modal.Title>
            <Link to={'/community/profile/' + this.props.createCommunityStatus.data._id}><Button onClick={() => this.navigateToCommunityProfile()}>Go to page</Button></Link>
           </Modal>
        }
        <button onClick={(e) => this.onCreateItem(e)} className="add-community-button">Create a community</button>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new item!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <ControlLabel>Item name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter item name"
                  onChange={(e) => this.onItemNameChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Community description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => this.onImgUrlChange(e)}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onCreate(e)}>Create a new community</Button>
            <Button onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CreateCommunityModal.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(CreateCommunityModal);
